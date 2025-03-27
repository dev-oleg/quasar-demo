export default {
  failed: 'Action failed',
  success: 'Action was successful',
  navigation: 'Navigation',
  filter: 'Filter',
  noData: 'No Data',
  cancel: 'Cancel',
  submit: 'Submit',
  page: {
    users: 'Users',
    posts: 'Posts',
    albums: 'Albums',
    todos: 'Todos',
  },
  users: {
    currentUser: 'Current User',
    table: {
      id: 'ID',
      username: 'Username',
      name: 'Name',
      email: 'Email',
      actions: 'Actions',
    },
  },
  posts: {
    table: {
      id: 'ID',
      title: 'Title',
      body: 'Body',
    },
    createDialog: {
      title: 'Create Post',
      form: {
        title: 'Title',
        body: 'Body',
      },
    },
    deleteDialog: {
      title: 'Delete Posts',
      message: 'Are you sure?',
      result: {
        success: 'Post {title} was deleted successfully',
        error: 'Post {title} was not deleted',
      },
    },
  },
  comments: {
    dialog: {
      title: 'Comments List',
    },
  },
  albums: {
    table: {
      id: 'ID',
      title: 'Title',
    },
  },
  todos: {
    table: {
      id: 'ID',
      title: 'Title',
      completed: 'Status',
    },
    createDialog: {
      title: 'Create Todo',
      form: {
        title: 'Title',
      },
    },
  },
  validation: {
    required: 'Field is required',
  },
};
