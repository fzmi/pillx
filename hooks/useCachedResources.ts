import React from 'react';
import { Image } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  function cacheImages(images: any) {
    return images.map((image: any) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Preload images
        await cacheImages([
          require('../assets/images/icons/logo.png'),
          require('../assets/images/profile/Avatar.png'),
          require('../assets/images/profile/Allergen.png'),
          require('../assets/images/profile/DOB.png'),
          require('../assets/images/profile/Email.png'),
          require('../assets/images/profile/Gender.png'),
          require('../assets/images/profile/Name.png'),
          require('../assets/images/pills/pill1.png'),
          require('../assets/images/pills/pill2.png'),
          require('../assets/images/pills/pill3.png'),
          require('../assets/images/medicine/effect/effect1.png'),
          require('../assets/images/medicine/effect/effect2.png'),
          require('../assets/images/medicine/effect/effect3.png'),
          require('../assets/images/medicine/method/external.png'),
          require('../assets/images/medicine/method/oral.png'),
          require('../assets/images/medicine/method/injection.png'),
        ]);
        
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          // 'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
