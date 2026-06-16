
import { surveyData } from "./surveyData";
export default function SurveyDataPage() {
    return (
        <section style={{ padding: "20px" }}>
            <h1>📊 Real Household Electricity Survey Dataset</h1>

            <p>15 Households • Srikakulam / Korni Region • Feb–Apr Analysis</p>

            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>House</th>
                        <th>Area</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>AC</th>
                        <th>Fans</th>
                    </tr>
                </thead>

                <tbody>
                    {surveyData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.house}</td>
                            <td>{item.area}</td>
                            <td>{item.feb}</td>
                            <td>{item.mar}</td>
                            <td>{item.apr}</td>
                            <td>{item.ac}</td>
                            <td>{item.fans}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}