const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const Role = db.define('role', {
  name: {
    type: Sequelize.STRING
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  }
});

//Relationships
User.belongsTo(Role);
Role.hasMany(User);


db.seed = async () => {
  const john = await User.create({
    name: 'John Dunn'
  });  
  const homie = await Role.create({
    name: 'Homie'
  }); 
  const jared = await User.create({
    name: 'Jared Jansen'
  });
  const marine = await Role.create({
    name: 'Marine'
  });
  john.setRole(homie);
  jared.setRole(marine);
}

db.addUserWithRole = async (userName, roleName) => {
  const user = await User.create({
    name: userName
  });
  const role = await Role.create({
    name: roleName
  });
  user.setRole(role);
  return user;
}

db.getUsersByRole = async (role) => {
  try {
    const users = await User.findAll({
      include: [Role] 
    }); 
    return users;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  db,
  models: {
    Role,
    User
  }
}

