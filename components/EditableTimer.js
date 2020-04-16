import React from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default EditableTimer = ({ id, title, project, elapsed, isRunning, onFormSubmit, onRemove, handleToggleRunning }) => {
    const [editFormOpen, setEditFormOpen] = React.useState(false);

    const handleEditPress = () => {
        setEditFormOpen(true);
    };

    const handleSubmit = (timer) => {
        onFormSubmit(timer);
        setEditFormOpen(false);
    };

    const handleFormClose = () => {
        setEditFormOpen(false);
    };

    const handleRemove = () => {
        onRemove(id);
    };

    const handleToggle = () => {
        handleToggleRunning(id);
    };

    if (editFormOpen) {
        return <TimerForm
            id={id}
            title={title}
            project={project}
            onFormSubmit={handleSubmit}
            onFormClose={handleFormClose}
        />;
    }

    return (
        <Timer
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onEditPress={handleEditPress}
            onRemovePress={handleRemove}
            onToggleRunning={handleToggle}
        />
    );
};