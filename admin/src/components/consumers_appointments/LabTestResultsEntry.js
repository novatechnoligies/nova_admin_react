import React, { useState } from "react";
import { Button, Input } from "antd";
import "./LabTestResultsEntry.css";

const LabTestResultsEntry = ({ appointmentId }) => {
  const [parameterResults, setParameterResults] = useState({});
  const [testForm, setTestForm] = useState({
    testId: 1,
    testName: "Complete Blood Count (CBC)",
    labMasterHeadings: [
      {
        testHeading: "HEMOGLOBIN",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 2,
            parameterName: "Hemoglobin(Hb)",
            unit: "g/dl",
            minValue: "13.0",
            maxValu: "17.0",
          },
        ],
      },
      {
        testHeading: "RBC COUNT",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 4,
            parameterName: "Total RBC count",
            unit: "mill/cumm",
            minValue: "4.5",
            maxValu: "5.5",
          },
        ],
      },
      {
        testHeading: "BLOOD INDICES",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 6,
            parameterName: "Packed Cell Valume(PCV)",
            unit: "%",
            minValue: "40",
            maxValu: "50",
          },
          {
            parametrId: 7,
            parameterName: "Mean Cropusular volume",
            unit: "%",
            minValue: "83",
            maxValu: "101",
          },
          {
            parametrId: 8,
            parameterName: "RDW",
            unit: "%",
            minValue: "11.6",
            maxValu: "14",
          },
        ],
      },
      {
        testHeading: "WBC COUNT",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 10,
            parameterName: "Total WBC Count",
            unit: "cumm",
            minValue: "4000",
            maxValu: "11000",
          },
        ],
      },
      {
        testHeading: "DIFFERENTIAL WBC COUNT",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 12,
            parameterName: "Nutrophils",
            unit: "%",
            minValue: "50",
            maxValu: "62",
          },
          {
            parametrId: 13,
            parameterName: "Lymphocytes",
            unit: "%",
            minValue: "20",
            maxValu: "40",
          },
          {
            parametrId: 14,
            parameterName: "Eosinophils",
            unit: "%",
            minValue: "00",
            maxValu: "06",
          },
          {
            parametrId: 15,
            parameterName: "Monocytes",
            unit: "%",
            minValue: "00",
            maxValu: "10",
          },
          {
            parametrId: 16,
            parameterName: "Basophils",
            unit: "%",
            minValue: "00",
            maxValu: "02",
          },
        ],
      },
      {
        testHeading: "Basophils",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 18,
            parameterName: "Platelet Count",
            unit: "cumm",
            minValue: "150000",
            maxValu: "410000",
          },
        ],
      },
      {
        testHeading: "Total RBC count",
        testHeadingId: null,
        labParametersDtos: [
          {
            parametrId: 19,
            parameterName: "MCH",
            unit: "pg",
            minValue: "27",
            maxValu: "32",
          },
          {
            parametrId: 20,
            parameterName: "MCHC",
            unit: "g/dl",
            minValue: "32.5",
            maxValu: "34.5",
          },
        ],
      },
    ],
  });

  const handleInputChange = (parametrId, value) => {
    setParameterResults((prevResults) => ({
      ...prevResults,
      [parametrId]: value,
    }));
  };

  const saveResults = () => {
    const resultsData = {
      appointmentId: appointmentId,
      testId: testForm.testId,
      testName: testForm.testName,
      results: Object.entries(parameterResults).map(
        ([parametrId, resultValue]) => {
          const parameter = testForm.labMasterHeadings
            .flatMap((heading) => heading.labParametersDtos)
            .find((param) => param.parametrId === parseInt(parametrId, 10));

          if (parameter) {
            return {
              parametrId: parseInt(parametrId, 10),
              parameterName: parameter.parameterName,
              result: resultValue,
              unit: parameter.unit,
            };
          } else {
            console.error(`Parameter with parametrId ${parametrId} not found.`);
            return {
              parametrId: parseInt(parametrId, 10),
              parameterName: "Parameter Not Found",
              result: resultValue,
              unit: "Unit Not Found",
            };
          }
        }
      ),
    };

    console.log("Results Data to be saved:", resultsData);
    // Here you can perform further actions with the resultsData,
    // such as sending it to an API or updating the state.
    // Clear all input values after saving results
    setParameterResults({});
  };

  const getValidationStatus = (value, minValue, maxValue) => {
    if (value < minValue) {
      return "low";
    } else if (value > maxValue) {
      return "high";
    } else {
      return "normal";
    }
  };

  return (
    <div className="lab-result-container">
      <div className="result-container">
        <h2 style={{ textAlign: "center" }}>{testForm.testName}</h2>
        {testForm.labMasterHeadings.map((heading, index) => (
          <div key={index}>
            <h3>{heading.testHeading}</h3>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Result</th>
                  <th>Reference Value</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {heading.labParametersDtos.map((parameter) => (
                  <tr key={parameter.parametrId}>
                    <td>{parameter.parameterName}</td>
                    <td>
                      <Input
                        type="text"
                        id={`result-${parameter.parametrId}`}
                        value={parameterResults[parameter.parametrId] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            parameter.parametrId,
                            e.target.value
                          )
                        }
                        className={`result-input ${getValidationStatus(
                          parseFloat(parameterResults[parameter.parametrId]),
                          parseFloat(parameter.minValue),
                          parseFloat(parameter.maxValu)
                        )}`}
                      />
                      {getValidationStatus(
                        parseFloat(parameterResults[parameter.parametrId]),
                        parseFloat(parameter.minValue),
                        parseFloat(parameter.maxValu)
                      ) === "low" && <span className="low-indicator">Low</span>}
                      {getValidationStatus(
                        parseFloat(parameterResults[parameter.parametrId]),
                        parseFloat(parameter.minValue),
                        parseFloat(parameter.maxValu)
                      ) === "high" && (
                        <span className="high-indicator">High</span>
                      )}
                    </td>
                    <td>
                      {parameter.minValue} to {parameter.maxValu}
                    </td>
                    <td>{parameter.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {index < testForm.labMasterHeadings.length - 1 && <div></div>}
          </div>
        ))}
      </div>
      <div className="footer-btn">
        <Button
          type="primary"
          onClick={saveResults}
          style={{ marginLeft: "360px", marginRight: "10px" }}
        >
          Save Results
        </Button>
        <Button type="primary">Save and Create Report</Button>
      </div>
    </div>
  );
};

export default LabTestResultsEntry;
