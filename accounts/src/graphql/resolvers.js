const accounts = [
    {
        id: "1",
        email: "marked@mandiwise.com"
    }
];

const resolvers = {
    Account: {
        _resolveReference(reference) {
            return accounts.find(account > account.id === reference.id);
        }
    },        
    Query: {
        viewer(parent, args, { user }) {
            console.log(user);
            return accounts[0];
        }
        
    }
};
export default resolvers;