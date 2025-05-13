// src/types/react-native-check-box.d.ts
declare module 'react-native-check-box' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface CheckBoxProps {
      style?: ViewStyle;
      onClick?: () => void;
      isChecked?: boolean;
      leftText?: string;
      checkBoxColor?: string;
      leftTextStyle?: TextStyle;
      rightTextStyle?: TextStyle;
      checkedCheckBoxColor?: string;
      uncheckedCheckBoxColor?: string;
    }
  
    export default class CheckBox extends Component<CheckBoxProps> {}
  }
  