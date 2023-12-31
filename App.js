import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    disableNetwork,
    enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo"; // works like a React Hook
import { useEffect } from "react";
import { Alert } from "react-native";
import { getStorage } from "firebase/storage";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
    // this defines a new state that represents the network connectivity status
    const connectionStatus = useNetInfo();

    // displays an alert popup if connection is lost
    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!");
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    const firebaseConfig = {
        apiKey: "AIzaSyDF7z7TRP_OvHOVZmYMNWMvEOOuomPXx7E",
        authDomain: "chat-app-fe7b9.firebaseapp.com",
        projectId: "chat-app-fe7b9",
        storageBucket: "chat-app-fe7b9.appspot.com",
        messagingSenderId: "571219286065",
        appId: "1:571219286065:web:4583f0feeffc7af63d5d10",
    };

    // initializing firebase
    const app = initializeApp(firebaseConfig);

    // db is object that can be passed to Start or Chat to read and write to/from database
    const db = getFirestore(app);

    // firebase storage handler
    const storage = getStorage(app);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat">
                    {(props) => (
                        <Chat
                            isConnected={connectionStatus.isConnected}
                            db={db}
                            storage={storage}
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
