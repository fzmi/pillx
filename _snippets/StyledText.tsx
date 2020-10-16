import * as React from 'react';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

// const rightButtons = [
//   <TouchableHighlight>
//     <View style={{
//       backgroundColor: "#B22222",
//       marginTop: 40,
//       marginLeft: 10,
//       borderRadius: 25,
//       width: 40,
//       height: 40,
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       <Entypo style={{ color: "#eee" }} name="trash" size={24} color="black" />
//     </View>
//   </TouchableHighlight>
// ];
