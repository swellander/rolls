const expect = require('chai').expect;
const { db } = require('../models');
const { Role, User } = require('../models').models;

let user; 
let roll;
beforeEach(async () => {
  await db.sync({ force: true });
  await db.seed();
})


describe('test', () => {
  it('exists', () => {
    expect(db).to.be.ok;
  })
})

describe('Roll model', () => {
  it('exists', () => {
    expect(Role).to.be.ok;
  });
  it('can create a new role', async () => {
    const role = await Role.create({
      name: 'Engineer',
      location: 'West Wing'
    });
  })
})

describe('User model', async () => {
  it('exists', () => {
    expect(User).to.be.ok;
  });
  it('can create new users', async () => {
    const user = await User.create({
      name: 'John Dunn'
    });
    expect(user.name).to.equal('John Dunn');
  });
  // it('all users belong to a role', () => {
  //   expect(user.roleId).to.eql(null);
  // });
  // it(`it can set a user's role`, async () => {
  //   await user.setRole(role);
  //   console.log('hey');
  //   expect(user.roleId).to.equal(role.id);
  // })
});

describe('db methods', () => {
  it('can add a new user with a role', async () => {
    const john = await db.addUserWithRole('John', 'Homie');
    expect(john).to.be.ok;
    expect(john.roleId).to.not.eql(null);
  })
  it('can get an array of all users by role name', async () => {
    const userArr = await db.getUsersByRole('Marine');
    expect(userArr.length).to.equal(1);
  })
  it('can get an array of all users and their roles', () => {
    db.getAllUsersAndRoles()
      .then(arr => {
        expect(arr.length).to.eql(2);
        expect(arr[0].role.name).to.equal('Homie');
      })
      .catch(console.log);
  })
})




