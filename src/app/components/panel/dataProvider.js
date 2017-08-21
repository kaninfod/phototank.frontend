import store from '../../redux/store';
const reduxState = store.getState();

export function dataProvider(state) {
  switch (state.widget) {
    case 'INFO': {
      console.log(reduxState.toJS());
      return 'kaj';
    }

    default:

  }
}
