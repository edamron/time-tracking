import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

const Timer = ({ id, title, project, elapsed, isRunning, onEditPress, onRemovePress, onToggleRunning }) => {
    const [isActive, setIsActive] = useState(isRunning);
    useEffect(() => {
        // console.log(`${title} "isActive" initialized or changed`);
        let interval = null;
        if (isActive) {
            // console.log('calling setInterval()...');
            interval = setInterval(() => {
                // console.log('interval!!');
                setSeconds(seconds => seconds + 1000);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            // console.log('isActive is false, clearing interval...');
            clearInterval(interval);
            interval = null;
        }
        return () => {
            if (interval) {
                // console.log('isActive effect callback');
                clearInterval(interval);
            }
        }
    }, [isActive]);

    const [runningFor, setRunningFor] = useState('00:00:00');
    const [seconds, setSeconds] = useState(elapsed);
    useEffect(() => {
        // console.log(`${title} "seconds" initialized or changed`);
        setRunningFor(millisecondsToHuman(seconds));
    }, [seconds]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const handleStartPress = () => {
        onStartPress(id);
    };

    const handleStopPress = () => {
        onStopPress(id);
    };

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{project}</Text>
            <Text>{runningFor}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
                <TimerButton color="blue" small title="Remove" onPress={onRemovePress} />
            </View>
            <TimerButton color="#21BA45" title={ isActive ? 'Stop' : 'Start' } onPress={toggle} />
        </View>
    );
};

Timer.displayName = '';

export default Timer;

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D7DA',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});