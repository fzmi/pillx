import AsyncStorage from '@react-native-community/async-storage';
import { Tracking } from '../types';

export default async function useTodayReminders(isoDate: string) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`https://deco3801-rever.uqcloud.net/user/medicine/getAllOnDate?email=${userToken}&onDate=${isoDate}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      let result = [] as Array<any>;
      data.map((medicine: any) => {
        result = result.concat(medicine.times.map((reminder: any) => ({
          trackingName: medicine.medicine.customName,
          medicineName: medicine.medicine.name,
          medicineId: medicine.medicine.identifier,
          time: new Date(reminder.time + "Z"),
          taken: reminder.taken,
          description: medicine.medicine.dosageDescription,
          image: require("../assets/images/pills/pill1.png")
        })));
      });
      return result;
    })
    .catch(error => {
      console.log(error);
    })
}
