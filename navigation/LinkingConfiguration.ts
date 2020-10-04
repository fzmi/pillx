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
              Add: {
                screens: {
                  ScanInputScreen: 'ScanInput',
                  ManualInputScreen: 'ManualInput',
                }
              },
              Data: {
                screens: {
                  EffectScreen: 'Effect',
                  MethodScreen: 'Method',
                }
              },
              EditScreen: 'Edit',
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
          RecoverScreen: 'Recover',
        }
      },
      NotFound: '*',
    },
  },
};
