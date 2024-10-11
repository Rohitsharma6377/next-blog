import { fetchDataFromDB } from '@/utils/helper';
import React, { useState, useEffect } from 'react';
// import LeadForm from '../parts/LeadForm';
import Slider from 'react-rangeslider';

const EligibilityCalculator = () => {
  const [work, setWork] = useState('');
  const [roi, setRoi] = useState(10);
  const [tenureY, setTenureY] = useState(10);
  const [tenureM, setTenureM] = useState(6);
  const [tenure, setTenure] = useState(10.5);
  const [income, setIncome] = useState('');
  const [currentEmi, setCurrentEmi] = useState(0);
  const [age, setAge] = useState('');
  const [loanEligibility, setLoanEligibility] = useState('');
  const [totalEmi, setTotalEmi] = useState(0);
  const [showData, setShowData] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [issue, setIssue] = useState('');

  useEffect(() => {
    calculateEligibility();
  }, [income, roi, tenureY, tenureM, age, currentEmi, totalEmi]);

  const incomeChange = (e) => {
    const value = parseInt(e.target.value);
    setIncome(value);
    setEmi(value);
  };

  const setEmi = (value) => {
    if (value < 20000) setTotalEmi(0);
    else if (value >= 20000 && value <= 50000) setTotalEmi(value * 0.4);
    else if (value >= 50000 && value <= 150000) setTotalEmi(value * 0.5);
    else if (value >= 150000 && value <= 250000) setTotalEmi(value * 0.6);
    else setTotalEmi(value * 0.65);
  };

  const changeTenureY = (e) => {
    const value = Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(e.target.value)));
    setTenureY(value);
    setTenure(value + tenureM / 12);
  };

  const changeTenureM = (e) => {
    const value = Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(e.target.value)));
    setTenureM(value);
    setTenure(tenureY + value / 12);
  };

  const changeRoi = (e) => {
    const value = Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(e.target.value)));
    setRoi(value);
  };

  const changeYear = (e) => {
    const value = Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(e.target.value)));
    setAge(value);
  };

  const tenureSlider = (e) => {
    const months = Math.round((e - parseInt(e)) * 12);
    setTenure(e);
    setTenureY(parseInt(e));
    setTenureM(months);
  };

  const calculateEligibility = () => {
    const term = tenureY * 12 + tenureM;
    if (income && age && roi > 0 && term > 0) {
      if (income < 20000) {
        setShowData(true);
        setEligible(false);
        setIssue('income');
      } else if (parseInt(age) + parseInt(tenure) > 65) {
        setShowData(true);
        setEligible(false);
        setIssue('tenure');
      } else if (parseInt(age) < 21) {
        setShowData(true);
        setEligible(false);
        setIssue('age');
      } else {
        const newEmi = totalEmi - currentEmi;
        const interest = roi / 1200;
        const top = Math.pow(1 + interest, term);
        const bottom = 1 - 1 / top;
        const ratio = 1 + 1 / interest;
        const loanEligibilityCalc = Math.trunc(newEmi * ratio * bottom);

        if (loanEligibilityCalc > 0) {
          if (loanEligibilityCalc < 100000000) {
            setLoanEligibility(loanEligibilityCalc);
          } else {
            setLoanEligibility(100000000);
          }
          setShowData(true);
          setEligible(true);
          setIssue('');
        } else {
          setShowData(true);
          setEligible(false);
          setIssue('');
        }
      }
    } else {
      setShowData(false);
    }
  };

  const priceInWords = (price) => {
    if (!price || price <= 0) return '';
  
    const units = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Lakh', 'Crore'];
  
    const numToWords = (num) => {
      if (num < 20) return units[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + units[num % 10] : '');
      if (num < 1000) return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numToWords(num % 100) : '');
    };
  
    const convertToWords = (num) => {
      let word = '';
      let scaleIndex = 0;
  
      while (num > 0) {
        const remainder = num % 1000;
        if (remainder > 0) {
          const words = numToWords(remainder);
          word = words + (scales[scaleIndex] ? ' ' + scales[scaleIndex] + ' ' : '') + word;
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
      }
  
      return word.trim();
    };
  
    return convertToWords(price);
  };
  

  const roiLabel = { 0: '0%', 20: '20%' };
  const tenureLabel = { 0: '0', 30: '30 Yrs' };

  return (
    <>
      <section className="pageBanner">
        <img src="images/icons/eligibitlity.svg" alt="" />
        <div>
          <h1>Eligibility Calculator</h1>
          <p>What loan amount can I borrow?</p>
        </div>
      </section>
      <div className="w-full container mt-5 mx-auto">
        <p className='text-center'>Our eligibility calculator helps you to estimate the amount of home loan that you can avail.</p>
        <div className="row my-5">
          <div className="col-sm-7">
            <div className="row mb-3 specialIG">
              <div className="col-sm-4">
                <label>Net Monthly Income</label>
                <div>
                  <span className="inputGroup">
                    <span className="inputParam inputParamLeft">&#8377;</span>
                    <input
                      type="number"
                      onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                      min={0}
                      max={99999999999999}
                      className="form-control inputFeildRight"
                      name="income"
                      value={income}
                      onChange={incomeChange}
                      placeholder="Current Income"
                    />
                  </span>
                  <p className="piw">{priceInWords(income)}</p>
                </div>
              </div>
              {/* Additional form fields here */}
            </div>
            <div className="row">
              <div className="col-sm-12 range-slider">
                <div className="amountTab">
                  <label>Rate of Interest</label>
                  <div>
                    <label>Enter Rate of Interest</label>
                    <span className="inputGroup">
                      <span className="inputParam inputParamLeft">%</span>
                      <input
                        type="number"
                        onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                        min={0}
                        max={20}
                        className="form-control inputFeildRight"
                        name="roi"
                        value={roi}
                        onChange={changeRoi}
                        placeholder="Rate of Interest"
                      />
                    </span>
                  </div>
                </div>
                <Slider min={0} max={20} step={0.05} labels={roiLabel} value={roi} onChange={setRoi} onChangeComplete={calculateEligibility} />
              </div>
              <div className="col-sm-12 range-slider">
                <div className="amountTab">
                  <label>Enter Loan Tenure</label>
                  <div className="tenureYM">
                    <span className="inputGroup">
                      <span className="inputParam inputParamLeft">Years</span>
                      <input
                        type="number"
                        onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                        min={0}
                        max={30}
                        className="form-control inputFeildRight"
                        name="tenureY"
                        value={tenureY}
                        onChange={changeTenureY}
                        placeholder="Loan Tenure Years"
                      />
                    </span>
                    <span className="inputGroup">
                      <span className="inputParam inputParamLeft">Months</span>
                      <input
                        type="number"
                        onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                        min={0}
                        max={12}
                        className="form-control inputFeildRight"
                        name="tenureM"
                        value={tenureM}
                        onChange={changeTenureM}
                        placeholder="Loan Tenure Months"
                      />
                    </span>
                  </div>
                </div>
                <Slider min={0} max={30} step={0.5} labels={tenureLabel} value={tenure} onChange={tenureSlider} onChangeComplete={calculateEligibility} />
              </div>
              <div className="col-sm-12 loanData">
                {issue === 'income' ? (
                  <p>Eligibility criteria for Income norms not met</p>
                ) : issue === 'tenure' ? (
                  <p>Eligibility criteria for Age norms not met. Please reduce the loan tenure</p>
                ) : issue === 'age' ? (
                  <p>Eligibility Criteria for Age norms not met</p>
                ) : eligible && showData ? (
                  <div className="loanAmountData">
                    <label>Your eligible loan amount is</label>
                    <h2>&#8377; {loanEligibility}</h2>
                    <span>Rupees {priceInWords(loanEligibility)}</span>
                  </div>
                ) : showData ? (
                  <div className="loanAmountData">
                    <label>Your eligible loan amount is</label>
                    <h2>&#8377; 0</h2>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {/* <LeadForm formName="Eligibility Page" /> */}
        </div>
      </div>
    </>
  );
};

export default EligibilityCalculator;




export async function getServerSideProps(context) {
  const { req } = await context;
  const pageUrl = `${req.url}`;
  
  let page;
  try {
    page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
  }
  catch (err) {
    console.error("Error fetching data:", err);
  }
  
  return { props: { page: page || [] } };
}