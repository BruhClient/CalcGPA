import { BaseToast, ErrorToast } from "react-native-toast-message";
import { styles } from "./styles";

// Custom configuration
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={styles.successText}
      text2Style={styles.successText}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      text1Style={styles.errorText}
      text2Style={styles.errorText}
    />
  ),
};
