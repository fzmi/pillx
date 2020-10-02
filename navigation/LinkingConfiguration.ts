import * as Linking from 'expo-linking';

// this is for url support in browsers
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Today: {
            screens: {
              TodayScreen: 'Today',
            },
          },
          Medicine: {
            screens: {
              MedicineScreen: 'Medicine',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'Profile',
            },
          },
        },
      },
      Public: {
        screens: {
          SignInScreen: 'SignIn',
          RegisterScreen: 'Register',
          RecoverScreen: "Recover"
        }
      },
      NotFound: '*',
    },
  },
};
