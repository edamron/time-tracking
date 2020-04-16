import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// React Native ONLY -> import { StyleSheet, Text, View } from 'react-native';

const TestComp = ({ p1, p2 }) => {
    
};

TestComp.propTypes = {
    p1: PropTypes.string.isRequired, // <- e.g., a required string
    p2: PropTypes.func, // <- e.g., an optional function
};

TestComp.displayName = 'TestComp'

export default TestComp;