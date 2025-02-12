import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';
import axios from 'axios';

const premiumData = {
  "75,000,000": { M: 183674, "M+1": 275511, "M+2": 353573, "M+3": 427808, "M+4": 489798, "M+5": 551788, "M+6": 613778, "M+7": 1289547, "M+8": 1965315, "M+9": 2641084, "M+10": 3316852, Extra: 675768 },
 "67,500,000": { M: 176787, "M+1": 269389, "M+2": 346838, "M+3": 420308, "M+4": 482145, "M+5": 543982, "M+6": 605819, "M+7": 667656, "M+8": 729493, "M+9": 791330, "M+10": 853167, Extra: 61837 },
 "63,750,000": { M: 176787, "M+1": 266328, "M+2": 343471, "M+3": 416558, "M+4": 478319, "M+5": 540079, "M+6": 601840, "M+7": 663600, "M+8": 725361, "M+9": 787121, "M+10": 848882, Extra: 61760 },
 "60,000,000": { M: 174491, "M+1": 263267, "M+2": 340104, "M+3": 412808, "M+4": 474492, "M+5": 536176, "M+6": 597860, "M+7": 659544, "M+8": 721228, "M+9": 782912, "M+10": 844596, Extra: 61684 },
 "56,250,000": { M: 172195, "M+1": 260205, "M+2": 336736, "M+3": 409058, "M+4": 470665, "M+5": 532273, "M+6": 593880, "M+7": 655488, "M+8": 717095, "M+9": 778703, "M+10": 840310, Extra: 61607 },
 "52,500,000": { M: 169899, "M+1": 257144, "M+2": 333369, "M+3": 405308, "M+4": 466839, "M+5": 528370, "M+6": 589901, "M+7": 651432, "M+8": 712963, "M+9": 774493, "M+10": 836024, Extra: 61531 },
 "48,750,000": { M: 167603, "M+1": 254083, "M+2": 330002, "M+3": 401558, "M+4": 463012, "M+5": 524467, "M+6": 585921, "M+7": 647375, "M+8": 708830, "M+9": 770284, "M+10": 831739, Extra: 61454 },
 "45,000,000": { M: 165307, "M+1": 251022, "M+2": 326634, "M+3": 397808, "M+4": 459186, "M+5": 520564, "M+6": 581942, "M+7": 643319, "M+8": 1868580, "M+9": 2511900, "M+10": 3155219, Extra: 643319 },
 "41,250,000": { M: 163011, "M+1": 247960, "M+2": 323267, "M+3": 394058, "M+4": 455359, "M+5": 516661, "M+6": 577962, "M+7": 639263, "M+8": 700565, "M+9": 761866, "M+10": 823167, Extra: 61301 },
 "37,500,000": { M: 160715, "M+1": 244899, "M+2": 319899, "M+3": 390308, "M+4": 451533, "M+5": 512758, "M+6": 573982, "M+7": 635207, "M+8": 696432, "M+9": 757657, "M+10": 818881, Extra: 61225 },
 "33,750,000": { M: 159437, "M+1": 242741, "M+2": 316976, "M+3": 386619, "M+4": 447706, "M+5": 508801, "M+6": 569896, "M+7": 630990, "M+8": 692085, "M+9": 753180, "M+10": 814274, Extra: 61095 },
 "30,000,000": { M: 158159, "M+1": 240567, "M+2": 314037, "M+3": 382915, "M+4": 443880, "M+5": 504844, "M+6": 565809, "M+7": 626773, "M+8": 687738, "M+9": 748702, "M+10": 809667, Extra: 60965 },
 "26,250,000": { M: 156888, "M+1": 238402, "M+2": 311106, "M+3": 379219, "M+4": 440053, "M+5": 500895, "M+6": 561737, "M+7": 622579, "M+8": 683422, "M+9": 744264, "M+10": 805106, Extra: 60842 },
 "22,500,000": { M: 155610, "M+1": 236228, "M+2": 308167, "M+3": 375515, "M+4": 436227, "M+5": 496939, "M+6": 557651, "M+7": 618363, "M+8": 679075, "M+9": 739787, "M+10": 800499, Extra: 60712 },
 "18,750,000": { M: 154340, "M+1": 234062, "M+2": 305236, "M+3": 371818, "M+4": 432400, "M+5": 492990, "M+6": 553579, "M+7": 614169, "M+8": 674758, "M+9": 735348, "M+10": 795937, Extra: 60590 },
 "15,000,000": { M: 153062, "M+1": 231889, "M+2": 302297, "M+3": 368114, "M+4": 428573, "M+5": 489033, "M+6": 549492, "M+7": 609952, "M+8": 670411, "M+9": 730871, "M+10": 791330, Extra: 60459 },
 "12,750,000": { M: 146939, "M+1": 218113, "M+2": 283165, "M+3": 343624, "M+4": 391839, "M+5": 440053, "M+6": 488268, "M+7": 536482, "M+8": 584697, "M+9": 632911, "M+10": 681126, Extra: 48215 },
 "11,250,000": { M: 141582, "M+1": 202807, "M+2": 260971, "M+3": 313777, "M+4": 355869, "M+5": 397961, "M+6": 440053, "M+7": 482145, "M+8": 524237, "M+9": 566329, "M+10": 608421, Extra: 42092 },
 "10,000,000": { M: 136820, "M+1": 190600, "M+2": 244912, "M+3": 293189, "M+4": 332931, "M+5": 372673, "M+6": 412414, "M+7": 452156, "M+8": 491898, "M+9": 531640, "M+10": 571381, Extra: 39642 },
 "8,750,000": { M: 129672, "M+1": 177664, "M+2": 228684, "M+3": 273971, "M+4": 311005, "M+5": 348040, "M+6": 385074, "M+7": 422109, "M+8": 459143, "M+9": 496178, "M+10": 533212, Extra: 37035 },
 "7,500,000": { M: 119763, "M+1": 162087, "M+2": 208444, "M+3": 249780, "M+4": 283628, "M+5": 317475, "M+6": 351323, "M+7": 385171, "M+8": 419018, "M+9": 452866, "M+10": 486714, Extra: 33694 },
 "6,250,000": { M: 111714, "M+1": 149313, "M+2": 191617, "M+3": 229692, "M+4": 260683, "M+5": 291674, "M+6": 322665, "M+7": 353656, "M+8": 384647, "M+9": 415638, "M+10": 446629, Extra: 30991 },
 "5,000,000": { M: 108908, "M+1": 144084, "M+2": 184724, "M+3": 221559, "M+4": 251343, "M+5": 281128, "M+6": 310913, "M+7": 340697, "M+8": 370482, "M+9": 400266, "M+10": 430051, Extra: 29684 },
 "3,750,000": { M: 101396, "M+1": 132377, "M+2": 169649, "M+3": 203463, "M+4": 230804, "M+5": 258145, "M+6": 285486, "M+7": 312827, "M+8": 340168, "M+9": 367509, "M+10": 394850, Extra: 27279 },
 "2,500,000": { M: 90022, "M+1": 117553, "M+2": 151241, "M+3": 181436, "M+4": 205925, "M+5": 230414, "M+6": 254903, "M+7": 279392, "M+8": 303881, "M+9": 328370, "M+10": 352859, Extra: 24690 },
 "1,250,000": { M: 77409, "M+1": 99527, "M+2": 128081, "M+3": 153388, "M+4": 174176, "M+5": 194964, "M+6": 215752, "M+7": 236540, "M+8": 257328, "M+9": 278116, "M+10": 298904, Extra: 20812 },
 "750,000": { M: 71467, "M+1": 90348, "M+2": 116296, "M+3": 139671, "M+4": 158527, "M+5": 177383, "M+6": 196239, "M+7": 215095, "M+8": 233951, "M+9": 252807, "M+10": 271663, Extra: 18756 }
};

const UpdateCooporateInpatient = () => {
    const { state, dispatch } = useContext(AuthContext);
    const { userInfo } = state;
    const params = useParams();
        const { id: corpotateId } = params;
        const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setCategories(data.cooporateCart.categories || []);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
        fetchData();
      }, [corpotateId, userInfo]);
  
    const handleAddCategory = () => {
      const newCategory = {
        id: categories.length + 1, limit: '', members: 0, dependencies: {},
        totalDependencies: {}, totalPremiumValues: {}, premiumValues: {}, totalPremium: 0, totalPremiumM: 0
      };
      setCategories([...categories, newCategory]);
    };
  
    const handleLimitChange = (id, e) => {
      const newCategories = categories.map(category =>
        category.id === id ? { ...category, limit: e.target.value } : category
      );
      setCategories(newCategories);
    };
  
    const handleAddMember = (id) => {
      const newCategories = categories.map(category =>
        category.id === id ? { ...category, members: category.members + 1 } : category
      );
      setCategories(newCategories);
    };
  
    const handleRemoveMember = (id) => {
      const newCategories = categories.map(category =>
        category.id === id && category.members > 0 ? {
          ...category,
          members: category.members - 1,
          dependencies: { ...category.dependencies, [`M+${category.members}`]: undefined }
        } : category
      );
      setCategories(newCategories);
    };
  
    const handleDependencyChange = (id, label, e) => {
        const value = parseInt(e.target.value) || 0;
        const newCategories = categories.map(category =>
          category.id === id ? { ...category, dependencies: { ...category.dependencies, [label]: value } } : category
        );
        setCategories(newCategories);
      };
  
    const calculateOverallDependenciesTotal = (category) => {
      let overallTotal = 0;
      const labels = Object.keys(category.totalDependencies);
  
      for (let i = 0; i < labels.length; i++) {
        overallTotal += category.totalDependencies[labels[i]] || 0;
      }
  
      return overallTotal;
    };
  
    const calculateTotalPremiumValue = (category) => {
      let totalPremiumValue = 0;
      const memberLabels = Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
      for (let i = 0; i < memberLabels.length; i++) {
        const label = memberLabels[i];
        const premiumValuePerMember = (premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0);
        totalPremiumValue += premiumValuePerMember;
      }
      return totalPremiumValue;
    };
  
    const calculateOverallTotals = () => {
      let overallTotalPremium = 0;
      let overallDependenciesTotal = 0;
      let totalStaffFamily = 0;
  
      categories.forEach(category => {
        overallTotalPremium += calculateTotalPremiumValue(category);
        overallDependenciesTotal += calculateOverallDependenciesTotal(category);
        const totalMembers = Object.values(category.dependencies).reduce((sum, value) => sum + value, 0);
        totalStaffFamily += totalMembers;
      });
  
      return { overallTotalPremium, overallDependenciesTotal, totalStaffFamily };
    };
  
    useEffect(() => {
        const serializedDependencies = JSON.stringify(
          categories.map(category => category.dependencies)
        );
      
        const updatedCategories = categories.map(category => {
          let updatedTotalDependencies = { ...category.totalDependencies };
          const labels = Object.keys(category.dependencies);
      
          for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const value = category.dependencies[label] || 0;
            let calculatedTotal = value;
      
            if (label !== 'M') {
              const numDependents = parseInt(label.slice(2), 10);
              calculatedTotal += numDependents * value;
            }
      
            updatedTotalDependencies[label] = calculatedTotal;
          }
      
          let totalPremiumValue = calculateTotalPremiumValue(category);
          let totalPremiumMValue = totalPremiumValue;
      
          const premiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
            acc[key] = premiumData[category.limit]?.[key] || 0;
            return acc;
          }, {});
      
          const totalPremiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
            acc[key] = (premiumData[category.limit]?.[key] || 0) * (category.dependencies[key] || 0);
            return acc;
          }, {});
      
          return {
            ...category,
            totalDependencies: updatedTotalDependencies,
            totalPremium: totalPremiumValue,
            totalPremiumM: totalPremiumMValue,
            premiumValues,
            totalPremiumValues,
          };
        });
      
        setCategories(updatedCategories);
      }, [JSON.stringify(categories.map(category => category.dependencies))]);
      
  
    const handleSave = () => {
      const overallTotals = calculateOverallTotals();
      const cooporateCart = { categories, overallTotals };
      dispatch({ type: 'SET_COOPORATE_CART', payload: cooporateCart });
      localStorage.setItem('cooporateCart', JSON.stringify(cooporateCart));
      console.log(cooporateCart);
       navigate(`/updateOutcooporate/${corpotateId}`);
    };
  
    const renderCategoryTables = () => {
        return categories.map(category => (
          <div key={category.id}>
            <Row className="my-4">
              <Col>
                <h5>Category {category.id}</h5>
                <Form>
                  <Form.Group controlId={`limitSelect-${category.id}`}>
                    <Form.Label>Select Inpatient Limit</Form.Label>
                    <Form.Control as="select" value={category.limit} onChange={(e) => handleLimitChange(category.id, e)}>
                      <option value="">Select...</option>
                      {Object.keys(premiumData).map((limitValue) => (
                        <option key={limitValue} value={limitValue}>
                          {limitValue}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(category.id)}>
                  Add Member
                </Button>
                <Button variant="danger" onClick={() => handleRemoveMember(category.id)}>
                  Remove Member
                </Button>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Premium/family</th>
                      <th>Number of staff/family</th>
                      <th>Total lives</th>
                      <th>Total Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{premiumData[category.limit]?.[label]}</td>
                        <td>
                          <Form.Control type="number" value={category.dependencies[label] || ''} onChange={(e) => handleDependencyChange(category.id, label, e)} />
                        </td>
                        <td>{category.totalDependencies[label]}</td>
                        <td>{(premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <h4>Total Premium: {calculateTotalPremiumValue(category)}</h4>
                <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(category)}</h4>
              </Col>
            </Row>
          </div>
        ));
      };
  
    const overallTotals = calculateOverallTotals();
    
    
  
    return (
        <div>
          <CheckOutCooporateSteps step1 step2 />
          <Container>
            {renderCategoryTables()}
            <Row className="my-4">
              <Col>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Button onClick={handleSave}>Save And Continue</Button>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <h3>Overall Total Premium: {overallTotals.overallTotalPremium}</h3>
                <h3>Overall Dependencies Total: {overallTotals.overallDependenciesTotal}</h3>
                <h3>Total Number of Staff/Family: {overallTotals.totalStaffFamily
}</h3>
              </Col>
            </Row>
          </Container>
        </div>
      );
  };
  
  export default UpdateCooporateInpatient;
