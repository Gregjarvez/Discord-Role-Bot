const Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();

client.connect({ token: 'MzM4MTAwMTE5ODI2MzMzNjk3.DFQf1g.Hg2sm3F8zoJ4mEaV-WYehC-TE5M' });

client.Dispatcher.on(Events.GATEWAY_READY, () => {
    console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    let userMsgId = e.message.author.id;
    const guild = client.Guilds.find(g => g.name === 'CodingPhase');

    const beginnerRole = guild.roles.find(r => r.name === 'Beginner');
    const juniorRole = guild.roles.find(r => r.name === 'Junior');
    const intermediateRole = guild.roles.find(r => r.name === 'Intermediate');
    const advancedRole = guild.roles.find(r => r.name === 'Advanced');
    const fullstackRole = guild.roles.find(r => r.name === 'Fullstack');
    const frontendRole = guild.roles.find(r => r.name === 'Frontend');
    const backendRole = guild.roles.find(r => r.name === 'Backend');
    const devopsRole = guild.roles.find(r => r.name === 'DevOps');
    const graphicsdesignerRole = guild.roles.find(r => r.name === 'GraphicsDesigner');
    const htmlRole = guild.roles.find(r => r.name === 'html');
    const cssRole = guild.roles.find(r => r.name === 'css');
    const javascriptRole = guild.roles.find(r => r.name === 'javascript');
    const phpRole = guild.roles.find(r => r.name === 'php');
    const mysqlRole = guild.roles.find(r => r.name === 'mysql');

    let matchedUser = guild.members.find(userId => userId.id === userMsgId);
    const addRole = '!addrole';
    const removeRole = '!removerole';
    const roles = ['Beginner','Junior','Intermediate','Advanced','Fullstack','Frontend','Backend','DevOps','GraphicsDesigner','html','css','javascript','php','mysql'];

    if (e.message.channel.name === 'bots') {
        switch (e.message.content) {
            case '!roles':
                e.message.reply('The roles that can be added to/removed from your profile are as follow:\nBeginner | Junior | Intermediate | Advanced \nFullstack | Frontend | Backend | DevOps | GraphicsDesigner \nHTML | CSS | JavaScript | PHP | MySQL \nTo modify the roles attributed to your profile use the following commands:\n!addrole and !removerole followed by the correct role.');
                break;
            case `${addRole} ${roles[0]}`:
                matchedUser.assignRole(beginnerRole.id);
                break;
            case `${removeRole} ${roles[0]}`:
                matchedUser.unassignRole(beginnerRole.id);
                break;
            case `${addRole} ${roles[1]}`:
                matchedUser.assignRole(juniorRole.id);
                break;
            case `${removeRole} ${roles[1]}`:
                matchedUser.unassignRole(juniorRole.id);
                break;
            case `${addRole} ${roles[2]}`:
                matchedUser.assignRole(intermediateRole.id);
                break;
            case `${removeRole} ${roles[2]}`:
                matchedUser.unassignRole(intermediateRole.id);
                break;
            case `${addRole} ${roles[3]}`:
                matchedUser.assignRole(advancedRole.id);
                break;
            case `${removeRole} ${roles[3]}`:
                matchedUser.unassignRole(advancedRole.id);
                break;
            case `${addRole} ${roles[4]}`:
                matchedUser.assignRole(fullstackRole.id);
                break;
            case `${removeRole} ${roles[4]}`:
                matchedUser.unassignRole(fullstackRole.id);
                break;
            case `${addRole} ${roles[5]}`:
                matchedUser.assignRole(frontendRole.id);
                break;
            case `${removeRole} ${roles[5]}`:
                matchedUser.unassignRole(frontendRole.id);
                break;
            case `${addRole} ${roles[6]}`:
                matchedUser.assignRole(backendRole.id);
                break;
            case `${removeRole} ${roles[6]}`:
                matchedUser.unassignRole(backendRole.id);
                break;
            case `${addRole} ${roles[7]}`:
                matchedUser.assignRole(devopsRole.id);
                break;
            case `${removeRole} ${roles[7]}`:
                matchedUser.unassignRole(devopsRole.id);
                break;
            case `${addRole} ${roles[8]}`:
                matchedUser.assignRole(graphicsdesignerRole.id);
                break;
            case `${removeRole} ${roles[8]}`:
                matchedUser.unassignRole(graphicsdesignerRole.id);
                break;
            case `${addRole} ${roles[9]}`:
                matchedUser.assignRole(htmlRole.id);
                break;
            case `${removeRole} ${roles[9]}`:
                matchedUser.unassignRole(htmlRole.id);
                break;
            case `${addRole} ${roles[10]}`:
                matchedUser.assignRole(cssRole.id);
                break;
            case `${removeRole} ${roles[10]}`:
                matchedUser.unassignRole(cssRole.id);
                break;
            case `${addRole} ${roles[11]}`:
                matchedUser.assignRole(javascriptRole.id);
                break;
            case `${removeRole} ${roles[11]}`:
                matchedUser.unassignRole(javascriptRole.id);
                break;
            case `${addRole} ${roles[12]}`:
                matchedUser.assignRole(phpRole.id);
                break;
            case `${removeRole} ${roles[12]}`:
                matchedUser.unassignRole(phpRole.id);
                break;
            case `${addRole} ${roles[13]}`:
                matchedUser.assignRole(mysqlRole.id);
                break;
            case `${removeRole} ${roles[13]}`:
                matchedUser.unassignRole(mysqlRole.id);
                break;
            default:
                break;
        }
    }
});