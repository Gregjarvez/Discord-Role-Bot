const Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie({autoReconnect: true});

client.connect({ token: '' });

client.Dispatcher.on(Events.GATEWAY_READY, () => {
    console.log(`Connected as: ${client.User.username}`);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {

    const guild = client.Guilds.find(g => g.name === 'CodingPhase');
    const userMsgId = e.message.author.id;
    const matchedUser = guild.members.find(userId => userId.id === userMsgId);
    const addRole = '!addrole ';
    const removeRole = '!removerole ';
    const roles = [{'roleName': 'Beginner'}, {'roleName': 'Junior'}, {'roleName': 'Intermediate'}, {'roleName': 'Advanced'}, {'roleName': 'Fullstack'}, {'roleName': 'Frontend'}, {'roleName': 'Backend'}, {'roleName': 'DevOps'}, {'roleName': 'GraphicsDesigner'}, {'roleName': 'HTML'}, {'roleName': 'CSS'}, {'roleName': 'JavaScript'}, {'roleName': 'Node.js'}, {'roleName': 'MongoDB'}, {'roleName': 'PHP'}, {'roleName': 'MySQL'}, {'roleName': 'C#'}, {'roleName': 'Python'}, {'roleName': 'Ruby'}, {'roleName': 'Java'}];

    const sizeCheck = obj => {
        let size = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    const serverRolesArray = guild.roles.map(role => {
        return {roleId: `${role.id}`, roleName: `${role.name}`};
    });

    const availableRoles = role => {
        return sizeCheck(role) > 0;
    };

    const filteredRoles = () => {
        return serverRolesArray.filter(role => {
            return availableRoles(role);
        });
    };

    const roleAllowedCheck = (role, filteredRoles) => {
        if (role.roleName === filteredRoles.roleName) {
            return role
        }
    };

    const allowedRolesObj = (filteredRoles) => {
        return roles.find(role => {
            return roleAllowedCheck(role, filteredRoles);
        });
    };

    const cleanedUpRoles = () => filteredRoles().filter(role => {
        return allowedRolesObj(role);
    });

    const checkIfRoleExists = userMsg => {
        return cleanedUpRoles().find(role => {
            if (role.roleName.toLowerCase() === userMsg) {
                return role
            }
        });
    };

    const checkIfUserHasRole = roleName => {
        return matchedUser.roles.find(role => {
            if (role.name.toLowerCase() === roleName) {
                return true;
            }
        });
    };

    const checkAndAssignRole = userMsg => {
        setTimeout(() => {
            matchedUser.assignRole(checkIfRoleExists(userMsg).roleId).then(msgReply('assigned'));
        }, 1000);
    };

    const checkAndUnassignRole = userMsg => {
        setTimeout(() => {
            matchedUser.unassignRole(checkIfRoleExists(userMsg).roleId).then(msgReply('unassigned'));
        }, 500);
    };

    const skillLevelCheck = userMsg => {
        return (userMsg === 'beginner') || (userMsg === 'junior') || (userMsg === 'intermediate') || (userMsg === 'advanced');
    };

    const ifHasRoleUnassign = roleName => {
        if (checkIfUserHasRole(roleName)) {
            checkAndUnassignRole(roleName);
        }
    };

    const skillRoleUnassignmentAndReassignment = userMsg => {
        ifHasRoleUnassign('beginner');
        ifHasRoleUnassign('junior');
        ifHasRoleUnassign('intermediate');
        ifHasRoleUnassign('advanced');
        checkAndAssignRole(userMsg);
    };

    const msgReply = msg => {
        if (msg === 'assigned') {
            e.message.channel.sendMessage('```diff\n+ ROLE ADDED\n```').then(msg => deleteReply(msg));
        } else {
            e.message.channel.sendMessage('```diff\n- ROLE REMOVED\n```').then(msg => deleteReply(msg));
        }
    };

    const deleteReply = msg => {
        setTimeout(() => {
            msg.delete();
        }, 7000);
    };

    if (e.message.channel.name === 'bots') {
        if (e.message.content.toLowerCase() === '!roles') {
            e.message.channel.sendMessage('```\nThe roles that can be added to/removed from your profile are as follow:\n\nBeginner | Junior | Intermediate | Advanced\nFullstack | Frontend | Backend | DevOps | GraphicsDesigner\nHTML | CSS | JavaScript | Node.js | MongoDB\nPHP | MySQL | C# | Python | Ruby | Java\n\nTo modify the roles attributed to your profile use the following commands:\n!addrole and !removerole followed by the correct role.\n\nRequests for different languages to be added must be directed to @Staff.\n\nWe won\'t be adding any frameworks or libraries as there are far too many to add for each language.\n\nWe may add certain frameworks or libraries that are requested frequently.\n```');
        }

        let msgIncluded;
        if (e.message.content.toLowerCase().includes(addRole)) {
            msgIncluded = addRole;
        } else if (e.message.content.toLowerCase().includes(removeRole)) {
            msgIncluded = removeRole;
        }
        const userMsg = e.message.content.replace(msgIncluded, '').toLowerCase();

        if ((checkIfRoleExists(userMsg)) && (msgIncluded === addRole) && (skillLevelCheck(userMsg))) {
            skillRoleUnassignmentAndReassignment(userMsg);
        } else if ((checkIfRoleExists(userMsg)) && (msgIncluded === addRole)) {
            checkAndAssignRole(userMsg);
        } else if ((checkIfRoleExists(userMsg)) && (msgIncluded === removeRole)) {
            checkAndUnassignRole(userMsg);
        }
    }
});