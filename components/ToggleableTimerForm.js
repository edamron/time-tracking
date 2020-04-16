import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default ToggleableTimerForm = ({ onFormSubmit }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleFormOpen = () => {
        setIsOpen(true);
    };

    const handleFormSubmit = (timerInfo) => {
        onFormSubmit(timerInfo);
        setIsOpen(false);
    };

    const handleFormClose = () => {
        setIsOpen(false);
    };

    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (
                <TimerForm
                    onFormClose={handleFormClose}
                    onFormSubmit={handleFormSubmit}
                />
            ) : (
                <TimerButton
                    title="+"
                    color="black"
                    onPress={handleFormOpen}
                />
            )}
        </View>
    );
};

ToggleableTimerForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
});