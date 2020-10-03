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
                  ManualInput: {
                    screens: {
                      FirstManualInputScreen: 'ManualInput1',
                      SecondManualInputScreen: 'ManualInput2',
                    }
                  }
                }
              }
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
