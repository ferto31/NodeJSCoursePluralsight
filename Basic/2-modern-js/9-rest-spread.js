const [first, ...restOfItems] = [10, 20, 30, 40];


// > first
// 10
// > restOfItems
// [ 20, 30, 40 ]


const data = {
  temp1: '001',
  temp2: '002',
  firstName: 'John',
  lastName: 'Doe',
};

const { temp1, temp2, ...person } = data;

// > temp1
// '001'
// > temp2
// '002'
// > person
// { firstName: 'John', lastName: 'Doe' }


const newArray = [...restOfItems];

// > newArray
// [ 20, 30, 40 ]

const newObject = {
  ...person,
};

// > newObject
// { firstName: 'John', lastName: 'Doe' }