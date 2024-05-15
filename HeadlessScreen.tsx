import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { OtplessHeadlessModule } from 'otpless-react-native';
import { useEffect } from 'react';
import { Clipboard } from 'react-native';
import { Modal } from 'react-native';
import styles from './styles';

const module = new OtplessHeadlessModule()

const HeadlessScreen: React.FC<Props> = ({ navigation }) => {
  let [selectedTab, setSelectedTab] = useState(0);
  let [otplessResponse, setOtplessResponse] = useState("")

  useEffect(() => {
    module.initHeadless("YYTFDI0602X3O5T5SIS5")
    module.setHeadlessCallback(onHeadlessResult)
    return () => {
      module.clearListener();
    }
  }, []);

  const onHeadlessResult = (data: any) => {
    let dataStr = JSON.stringify(data);
    setOtplessResponse(dataStr)
  }

  const handleTabSelection = (tab: number) => {
    if (tab == selectedTab) {
      return
    }
    setSelectedTab(tab)
    setOtplessResponse("")
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
        <TabItem label="Phone" index={0} selectedTab={selectedTab} setSelectedTab={handleTabSelection} />
        <TabItem label="Email" index={1} selectedTab={selectedTab} setSelectedTab={handleTabSelection} />
        <TabItem label="Social Sign In" index={2} selectedTab={selectedTab} setSelectedTab={handleTabSelection} />
      </View>

      {selectedTab !== undefined && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {selectedTab === 0 && <PhoneAuthView />}
          {selectedTab === 1 && <EmailAuthView/>}
          {selectedTab === 2 && <SSOAuthView/>}
        </View>
      )}

      {otplessResponse.length > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Otpless Response</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 10,
                borderRadius:30,
                justifyContent: 'center', 
                alignItems:'center'
              }}
              onPress={() => {
                if (otplessResponse) {
                  Clipboard.setString(otplessResponse);
                }
              }}>
              <Text style={{ color: 'white', paddingHorizontal: 20 }}>Copy Response</Text>
            </TouchableOpacity>
          </View>
      )}

      <Text style={{fontSize: 16, margin: 10}}>{otplessResponse}</Text>
    </ScrollView>
  );
};

export default HeadlessScreen;

type TabItemProps = {
  label: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabItem: React.FC<TabItemProps> = ({ label, index, selectedTab, setSelectedTab }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => setSelectedTab(index)}>
        <Text>{label}</Text>
      </TouchableOpacity>
      {selectedTab === index && <BlueLine />}
    </View>
  );
};

const PhoneAuthView: React.FC = () => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const startHeadless = () => {
    let headlessRequest = {
      countryCode: countryCode,
      phone: phoneNumber,
      ...(otp ? { otp: otp } : {}) 
    };
    module.startHeadless(headlessRequest);
  };

  return (
    <View style={{width: '100%'}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
        <Text style={styles.label}>Country Code</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCountryCode}
          value={countryCode}
          placeholder="Enter Country Code"
          placeholderTextColor="gray"
          keyboardType='number-pad'
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          placeholderTextColor="gray"
          keyboardType='number-pad'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={startHeadless}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOtp}
          value={otp}
          placeholder="Enter OTP"
          placeholderTextColor="gray"
          keyboardType='number-pad'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={startHeadless}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const EmailAuthView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const startHeadless = () => {
    let headlessRequest = {
      email: email,
      ...(otp ? { otp: otp } : {}) 
    };
    module.startHeadless(headlessRequest);
  };

  return (
    <View style={{width: '100%'}}>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter Email ID"
          placeholderTextColor="gray"
          keyboardType='email-address'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={startHeadless}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOtp}
          value={otp}
          placeholder="Enter OTP"
          placeholderTextColor="gray"
          keyboardType='number-pad'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={startHeadless}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const SSOAuthView: React.FC = () => {
  const [channelType, setChannelType] = useState('');

  const [areChannelsVisible, setChannelVisiblity] = useState(false);

  const toggleChannelTypesVisiblity = () => {
    setChannelVisiblity(!areChannelsVisible);
  };

  const closeMenu = () => {
    setChannelVisiblity(false);
  };

  const handleSelectedChannel = (selectedChannel: string) => {
    setChannelType(selectedChannel)
    closeMenu()
  }

  const startHeadless = () => {
    let headlessRequest = {
      channelType: channelType
    };
    module.startHeadless(headlessRequest);
  };

  return (
    <View style={{width: '100%'}}>

      <Text style={[styles.label, {margin: 10}]}>Select a channel that you have enabled on OTPLESS Dashboard</Text>

    <View >
          <TouchableOpacity onPress={toggleChannelTypesVisiblity} style={[styles.button]}>
            <Text style={styles.buttonText}>Select Channel</Text>
          </TouchableOpacity>

          <Modal
            visible={areChannelsVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeMenu}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>

              <View style={styles.menu}>
                {channelTypes.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => 
                    handleSelectedChannel(item)
                  } style={styles.menuItemButton}>
                    <Text style={styles.menuItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          style={[styles.button]}
          onPress={startHeadless}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <Text style={[styles.label, {}]}>Selected Channel Type - {channelType}</Text>

    </View>
  );
};



type Props = {
  navigation: StackNavigationProp<any>;
};

const BlueLine: React.FC = () => {
  return <View style={styles.blueLine} />;
};

const channelTypes = [
  "WHATSAPP", "GMAIL", "APPLE", "TWITTER", "DISCORD", "SLACK",
  "FACEBOOK", "LINKEDIN", "MICROSOFT", "LINE", "LINEAR", "NOTION",
  "TWITCH", "GITHUB", "BITBUCKET", "ATLASSIAN", "GITLAB"
];
