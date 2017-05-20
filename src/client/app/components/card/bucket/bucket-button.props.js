
export function getButtons(modifiers) {

  return (
    {
      horz: [
        {
          color: 'blue lighten-2',
          widgetContent: 'BUCKETGRID',
          icon: 'info_outline',
          key: 1,
          tooltip: 'Photo info',
          position: 'bottom',
        },
        {
          color: 'brown lighten-3',
          widgetContent: 'ALBUMS',
          icon: 'photo_album',
          key: 2,
        },
        {
          color: 'deep-orange lighten-2',
          widgetContent: 'ROTATE',
          icon: 'rotate_right',
          key: 3,
        },
        {
          color: 'lime',
          widgetContent: 'COMMENTS',
          icon: 'comment',
          key: 4,
        },
        {
          color: 'teal lighten-2',
          widgetContent: 'TAG',
          icon: 'local_offer',
          key: 5,
        },
        {
          color: 'deep-purple lighten-3',
          widgetContent: 'DELETE',
          icon: 'delete_forever',
          key: 6,
        },
      ],
      vert: [
        {
          color: 'modifiers.likeState',
          widgetContent: 'LIKE',
          icon: 'thumb_up', key: 3,
        },
      ],
    }
  );
}
