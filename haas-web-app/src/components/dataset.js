import './dataset.css';
import {Link} from 'react-router-dom';

export default function Dataset() {

    return (
        <div className="dataset">
            <h1>
                Datasets
            </h1>

            <Link to='/links'>
                Go back to nav page
            </Link>

            <ul>
                <a
                    className="ds-link"
                    href="https://physionet.org/content/adfecgdb/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Abdominal and Direct Fetal ECG Database
                </a>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                <a
                    className="ds-metalink"
                >
                    <i className="fas fa-database"

                    />

                </a>


            </ul>

            <ul>
                <a
                    className="ds-link"
                    href="https://physionet.org/content/aftdb/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AF Termination Challenge Database
                </a>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                <a
                    className="ds-metalink"
                >
                    <i className="fas fa-database" />
                </a>
            </ul>

            <ul>
                <a
                    className="ds-link"
                    href="https://physionet.org/content/ahadb/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AHA Database Sample Excluded Record
                </a>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                <a
                    className="ds-metalink"
                >
                    <i className="fas fa-database" />
                </a>
            </ul>

            <ul>
                <a
                    className="ds-link"
                    href="https://physionet.org/content/aami-ec13/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ANSI/AAMI EC13 Test Waveforms
                </a>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                <a
                    className="ds-metalink"
                >
                    <i className="fas fa-database" />
                </a>
            </ul>

            <ul>
                <a
                    className="ds-link"
                    href="https://physionet.org/content/apnea-ecg/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Apnea-ECG Database
                </a>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/apnea-ecg/apnea-ecg-database-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                <a
                    className="ds-metalink"
                >
                    <i className="fas fa-database"

                    />
                </a>
            </ul>


        </div>
    );

}