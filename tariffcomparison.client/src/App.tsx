import { useEffect, useState } from 'react';
import './App.css';

interface Tariff {
    tariffName: string;
    annualCosts: string;
    type: number;
    baseCost: number;
    additionalKwhCost: number;
    includedKwh: number;
}

function App() {

    const url = "http://localhost:5069/TariffProvider";
    const [error, setError] = useState(null);
    const [, setIsLoaded] = useState(false);
    const [data, setData] = useState<Tariff[]>([]);
    const [val, setVal] = useState("");

    const showAllTariff = () => {
        if (document.getElementById('consumption') && (document.getElementById('consumption') as HTMLInputElement)?.value) {
            const consumption = (document.getElementById('consumption') as HTMLInputElement)?.value;
            if (!isNaN(+consumption)) {
                fetch(url + "?Consumption=" + consumption, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(
                        (data) => {
                            setIsLoaded(true);
                            setData(data);
                            console.log("API fetched");
                        },

                        // Handle errors
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                            console.log("Error fetching API");
                        }
                    );
            }
        }
        else {
            alert("Enter value of Consumption in (kWh/year)")
        }
    }

    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === "Enter") {
            event.preventDefault();
            showAllTariff();
            setVal((document.getElementById('consumption') as HTMLInputElement).value);
        }
    };

    return (
        <div className="tariff-details">
            <form>
                <div>
                    <h2>Tariff Comparison</h2>
                    <label>Enter the Consumption in (kWh/year): </label>
                    <input type="text" placeholder="Enter Consumption.." id="consumption" value={val}
                        onChange={e => {
                            setVal(e.target.value);
                        }}
                        onKeyDown={handleKeyPress} />
                </div>

                <button type="button" className='btn-primary' onClick={showAllTariff}>Show all Tariffs</button>
            </form>

            {data != null && data.length > 0 ?
                <div className='list-view'>
                    {data.map((tariff, index) =>
                        <>
                            <ul>
                                <li key={index}>Tariff Name :{tariff.tariffName}</li>
                                <li key={index + 1}>Tariff Annual Costs : {tariff.annualCosts}/year</li>
                                <li key={index + 2}>Tariff Type : {tariff.type}</li>
                                <li key={index + 3}>Tariff Base Cost : {tariff.baseCost}</li>
                                <li key={index + 4}>Tariff Additional Kwh Cost : {tariff.additionalKwhCost}</li>
                                <li key={index + 5}>Tariff included Kwh: {tariff.includedKwh}</li>
                            </ul>
                        </>
                    )}
                </div>
                : <p></p>
            }

            {error && data.length == 0 ? <p>Error fetching API</p> : <p></p>}
        </div>

    );
}

export default App;