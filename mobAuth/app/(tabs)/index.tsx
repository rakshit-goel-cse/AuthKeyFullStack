import mainPage from '../mainPage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  return (
    <SafeAreaProvider>
            <SafeAreaView>
                {mainPage()}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
