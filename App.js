import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView } from 'react-native';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { uuidv4, newTimer } from './utils/TimerUtils';

export default function App() {
  const [timers, setTimers] = useState([
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 0,
        isRunning: false,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 0,
        isRunning: false,
      },
  ]);

  const handleCreateFormSubmit = (timerInfo) => {
    setTimers([newTimer(timerInfo), ...timers]);
  };

  const handleFormSubmit = (timerInfo) => {
    setTimers(timers.map(timer => {
      if (timer.id === timerInfo.id) {
        const { title, project } = timerInfo;

        return {
          ...timer,
          title,
          project,
        };
      }

      return timer;
    }));
  };

  const handleRemove = (idToRemove) => {
    setTimers(timers.filter(t => {
      return t.id !== idToRemove;
    }));
  }

  const toggleRunning = (idToToggle) => {
    setTimers(timers.map(timer => {
      if (timer.id === idToToggle) {
        return {
          ...timer,
          isRunning: !timer.isRunning,
        };
      }

      return timer;
    }));
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.timerListContainer}>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
          {timers.map(({ title, project, id, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={handleFormSubmit}
              onRemove={handleRemove}
              handleToggleRunning={toggleRunning}
            />
            ),
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  timerListContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});
