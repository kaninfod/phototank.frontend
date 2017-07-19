const state = {
  domainData: {
    photos: [
      {
        photo: {
          bucket: false,
          date_taken: 'Jul 02 2017 13:54:16',
          id: 2403,
          url: '/api/photofiles/9849/photoserve',
          url_lg: '/api/photofiles/9851/photoserve',
          url_org: '/api/photofiles/9852/photoserve',
        },
      },
    ],
    albums: [
      {
        album: {
          id: 1,
          name: '2016',
        },
      },
    ],
    catalogs: [
      {
        catalog: 'desc',
      },
    ],
    bucket: [
      {
        photoId: 1232,
        url: '',
      },
    ],
    tags: [
      {
        id: 2,
        name: 'tag text',
      },
    ],
  },
  appState: {
    photo: {
      id: '',
      date_taken: '',
      like: true,
      make: '',
      model: '',
      location: 1,
      url_lg: '/api/photofiles/9972/photoserve',
      url_md: '/api/p hotofiles/9971/photoserve',
      url_org: '/api/photofiles/9973/photoserve',
      url_tm: '/api/photofiles/9970/photoserve',
      comments: [
        {
          comment: '',
          id: 3,
          user_avatar: '',
          username: '',
        },
      ],
      tags: [
        {
          id: 2,
          name: 'comment text',
          tagging_count: 3,
        },
      ],
    },
    album: {
      id: 1,
      album_type: 'year',
      city: null,
      country: null,
      start: '2016-12-31',
      end: '2016-12-31',
      like: null,
      make: null,
      model: null,
      name: '2016',
    },
    user: {
        avatar: '',
        email: '',
        username: '',
        id: 1,
      },
  },
  uiState: {

  },
};
