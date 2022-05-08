import React from 'react';
import styles from "../styles/components/Bio.module.scss";

const Bio = ({ bio }) => {
    return (
        <div className={styles.bio}>{bio}</div>
    );
};

export default Bio;