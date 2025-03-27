export default {
  failed: 'Ошибка',
  success: 'Успешно',
  navigation: 'Навигация',
  filter: 'Фильтр',
  noData: 'Нет данных',
  cancel: 'Отмена',
  submit: 'Подтвердить',
  page: {
    users: 'Пользователи',
    posts: 'Посты',
    albums: 'Альбомы',
    todos: 'Список дел',
  },
  users: {
    currentUser: 'Текущий пользователь',
    table: {
      id: 'ID',
      username: 'Ник',
      name: 'Полное имя',
      email: 'Email',
      actions: 'Действия',
    },
  },
  posts: {
    table: {
      id: 'ID',
      title: 'Заголовок',
      body: 'Содержание',
    },
    createDialog: {
      title: 'Создание поста',
      form: {
        title: 'Заголовок',
        body: 'Содержимое',
      },
    },
    deleteDialog: {
      title: 'Удаление постов',
      message: 'Вы уверены?',
      result: {
        success: 'Пост {title} был успешно удален',
        error: 'Пост {title} не был удален',
      },
    },
  },
  comments: {
    dialog: {
      title: 'Список комментариев',
    },
  },
  albums: {
    table: {
      id: 'ID',
      title: 'Название',
    },
  },
  todos: {
    table: {
      id: 'ID',
      title: 'Название',
      completed: 'Статус',
    },
    createDialog: {
      title: 'Создание заметки',
      form: {
        title: 'Заголовок',
      },
    },
  },
  validation: {
    required: 'Это поле является обязательным',
  },
};
