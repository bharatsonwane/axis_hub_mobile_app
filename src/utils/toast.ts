import Toast from 'react-native-toast-message';

export const showSuccessToast = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000,
  });
};

export const showErrorToast = (message: string): void => {
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    visibilityTime: 4000,
  });
};
