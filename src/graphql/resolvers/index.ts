const persons = [
	{
		id: 1,
		name: 'John Doe',
		phone: '555-1234567',
		street: '123 Main St',
		city: 'Anytown, USA',
	},
	{
		id: 2,
		name: 'Jane Doe',
		phone: '555-7654321',
		street: '321 Main St',
		city: 'Anytown, USA',
	},
	{
		id: 3,
		name: 'John Smith',
		phone: '555-5555555',
		street: '555 Main St',
		city: 'Anytown, USA',
	},
];

export const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: () => persons,
	},
};
