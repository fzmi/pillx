import AsyncStorage from '@react-native-community/async-storage';
import { Tracking } from '../types';

// Get the tracking information for the medicine tab
export default async function useUserMedicine() {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch("http://deco3801-rever.uqcloud.net/user/medicine/getAll?email=" + userToken, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      }
    });
    const responseJson = await response.json();

    // translate response into Trackings, Medicines
    const trackings: Array<Tracking> = (responseJson as Array<any>).map(medicine => {
      if (!medicine.dosageSetting) {
        return {
          trackingName: "Not Available",
          medicineId: medicine.identifier === null ? "" : medicine.identifier,
          medicineName: "Not Available",
          instruction: "",
          image: "",
          frequency: {
            type: "day",
            value: 1,
          },
          reminders: [],
          startDate: new Date(),
          endDate: new Date(),
        };
      }
      let frequencyType: string;
      let frequencyValue: number | Array<number>;
      if (medicine.dosageSetting.intervalUsage as boolean) {
        frequencyType = (medicine.dosageSetting.intervalType as string).slice(0, -1).toLowerCase();
        frequencyValue = medicine.dosageSetting.interval as number;
      } else {
        frequencyType = "dayOfWeek";
        frequencyValue = (medicine.dosageSetting.weekdays as Array<boolean>).map((value: boolean, index: number) =>
          (value ? index + 1 : -1)).filter(value => value !== -1);
      }

      console.log(medicine.dosageSetting);
      return {
        // todo
        trackingName: "Medicine",
        medicineId: medicine.identifier === null ? "" : medicine.identifier,
        medicineName: medicine.name,
        instruction: medicine.identifier,
        image: "",
        frequency: {
          type: frequencyType as "day" | "week" | "month" | "dayOfWeek",
          value: frequencyValue,
        },
        reminders: [],
        startDate: new Date(`${medicine.dosageSetting.startDate}`),
        endDate: new Date(`${medicine.dosageSetting.endDate}`)
      }
    })

    return trackings;
  } catch (error) {
    console.log(error);
  }
}
