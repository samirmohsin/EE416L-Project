import './dataset.css';
import {Link} from 'react-router-dom';



export default function Dataset(){
    return (
        <div className="dataset">
            <h1>Datasets</h1>
            <Link to='/links'>
                Go back to nav page
            </Link>
            <div className="ds-table">
            <table>
                <tr>
                <th>Database</th>
                <th>Author</th>
                <th>Description</th>
                <th>Download</th>
                </tr>
                <tr>
                <td><a
                        href="https://physionet.org/content/aftdb/1.0.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        AF Termination Challenge Database
                    </a></td>
                <td>George Moody</td>
                <td>
                    This database of two-channel ECG recordings has been created for use in the Computers 
                    in Cardiology Challenge 2004, an open competition with the goal of developing automated methods 
                    for predicting spontaneous termination of atrial fibrillation (AF).
                </td>
                <td>
                    <a
                        className="ds-downlink"
                        href="https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-arrow-alt-circle-down" />
                    </a>
                </td>
                </tr>
                <tr>
                <td><a
                    href="https://physionet.org/content/ahadb/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AHA Database Sample Excluded Record
                </a></td>
                <td>ECRI Client Services</td>
                <td>
                    The data consist of a 3-hour recording of two ECG signals, for which the last 30 minutes 
                    are annotated beat-by-beat. From the original data, we have prepared record 0001, 
                    containing the entire 3-hour recording, and record 0201, containing the last 35 minutes only.
                </td>
                <td>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                </td>
                </tr>
                <tr>
                <td><a
                    href="https://physionet.org/content/aami-ec13/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ANSI/AAMI EC13 Test Waveforms
                </a></td>
                <td>PhysioNet Support MIT</td>
                <td>
                The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. 
                The recordings include both synthetic and real waveforms.
                Each recording contains one ECG signal sampled at 720 Hz with 12-bit resolution. 
                The recordings can be viewed or converted to text form using the PhysioBank ATM, or read directly using the WFDB Software Package.
                </td>
                <td>
                <a
                    className="ds-downlink"
                    href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-arrow-alt-circle-down" />
                </a>
                </td>
                </tr>
                <tr>
                <td><a
                    href="https://physionet.org/content/charisdb/1.0.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CHARIS database
                </a></td>
                <td>William Craelius</td>
                <td>
                The CHARIS database contains multi-channel recordings of ECG, arterial blood pressure (ABP), and intracranial pressure (ICP) 
                of patients diagnosed with traumatic brain injury (TBI). The data is contributed by members of the CHARIS project
                which aims to systematize the analysis of relevant physiological signals, and create data-driven algorithms to search for 
                potential predictors of acute clinical events for patients with acute brain injury.
                </td>
                <td>
                    <a
                        className="ds-downlink"
                        href="https://physionet.org/static/published-projects/charisdb/charis-database-1.0.0.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-arrow-alt-circle-down" />
                    </a>
                </td>
                </tr>
                <tr>
                <td>
                    <a
                        href="https://physionet.org/content/emgdb/1.0.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Examples of Electromyograms
                    </a>
                </td>
                <td>PhysioNet Support MIT</td>
                <td>
                    An electromyogram (EMG) is a common clinical test used to assess function of muscles and the nerves that control them.
                    EMG studies are used to help in the diagnosis and management of disorders such as the muscular dystrophies and neuropathies.
                    Nerve conduction studies that measure how well and how fast the nerves conduct impulses are often performed in conjunction 
                    with EMG studies.
                </td>
                <td>
                    <a
                            className="ds-downlink"
                            href="https://physionet.org/static/published-projects/emgdb/examples-of-electromyograms-1.0.0.zip"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-arrow-alt-circle-down" />
                    </a>
                </td>
                </tr>
            </table>
            </div>
        </div>
      );
}