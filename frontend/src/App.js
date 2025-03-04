import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./screens/LoginForm";
import { ToastContainer } from "react-toastify";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext";
import RegisterForm from "./screens/RegisterForm";
import QuotationResult from "./screens/QuotationResult";
import RetailForm from "./screens/RetailForm";
import UpdateRetailInpatient from "./screens/updateRetail/UpdateInpatient.jsx"
import LowCostForm from "./screens/LowCostForm";
import Cooporate from "./screens/Cooporate";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import IshemaForm from "./screens/IshemaForm";
import PremiumTable from "./retailPremiums/PremiumTable";
import DentalPremium from "./retailPremiums/DentalPremium";
import OpticalPremium from "./retailPremiums/OpticalPremium";
import OutPatientPremium from "./retailPremiums/OutPatientPremium";
import MaternityPremium from "./retailPremiums/MaternityPremium";
import LPremiumTable from "./LowCostPremium/PremiumTable";
import LDentalPremium from "./LowCostPremium/DentalPremium";
import LOpticalPremium from "./LowCostPremium/OpticalPremium";
import LMaternityPremium from "./LowCostPremium/MaternityPremium";
import SME from "./screens/SME";
import SPremiumTable from "./sme/PremiumTable";
import SDentalPremium from "./sme/DentalPremium";
import SOpticalPremium from "./sme/OpticalPremium";
import SOutPatientPremium from "./sme/OutPatientPremium";
import SMaternityPremium from "./sme/MaternityPremium";
import CooporateInpatient from "./Cooporate/CooporateInpatient";
import CooporateOutPatient from "./Cooporate/CooporateOutPatient";
import CooporateMaternity from "./Cooporate/CooporateMaternity";
import "./App.css";
import CompanyRegistration from "./Cooporate/CompanyRegistration";
import CorpBenefits from "./Cooporate/Benefits";
import logo from "./photoes/logo1.jpg";
import InshemaInpatient from "./ishema/InshemaInpatient";
import IshemaOutPatient from "./ishema/IshemaOutPatient";
import SmeList from "./screens/SMEList";
import RetailList from "./screens/RetailList";
import RetailDetails from "./screens/RetailDetails.jsx";
import CooperateList from "./screens/CooporateList.jsx";
import LowcostList from "./screens/LowcostList.jsx";
import LowCostDetails from "./screens/LowCostDetail.jsx";
import SmeDetails from "./screens/SsmeDetails.jsx";
import Count from "./screens/Count.jsx";
import IshemaDetails from "./screens/IshemaDetails.jsx";
import IshemaList from "./screens/IshemaList.jsx";
import UpdateIshema from "./updates/UpdateIshema.jsx";
import RetailBenefits from "./retailPremiums/Benefits.jsx";
import RetailBeneficiary from "./retailPremiums/BeneficiaryRegistration.jsx";
import LowcostBenefits from "./LowCostPremium/Benefits.jsx";
import LowcostBeneficiary from "./LowCostPremium/BeneficiaryRegistration.jsx";
import LOutPatientPremium from "./LowCostPremium/OutPatientPremium.jsx";
import SmeBeneficiary from "./sme/BeneficiaryRegistration.jsx";
import SmeBenefits from "./sme/Benefits.jsx";
import IshemaBeneficiary from "./ishema/BeneficiaryRegistration.jsx";
import IshemaBenefits from "./ishema/Benefits.jsx";
import UpdateCooperateForm from "./screens/CoporateUpdate.jsx";
import MembersList from "./screens/MembersList.jsx";
import Mixed from "./updates/Mixed.jsx";
import Combined from "./screens/Combined.jsx";
import CustomerList from "./screens/customer/CustomerList.jsx";
import AddCustomer from "./screens/customer/AddCustomer.jsx";
import CustomerDetail from "./screens/customer/CustomerDetail.jsx";
import Opticals from "./Cooporate/Opticals.jsx";
import Dentals from "./Cooporate/Dentals.jsx";
import CooporateCustomerDetails from "./screens/customer/CooporateCustomerDtails.jsx";
import CooporateCustomer from "./screens/customer/CooporateCustomer.jsx";
import CorporateDentalBenefits from "./Cooporate/dentalDenefits.jsx";
import CorporateOpticalBenefits from "./Cooporate/CorporateOpticalBenefits.jsx";
import PendingRetailQuotations from "./retailPremiums/PendingRetailQuotations.jsx";
import RetailApprovedQuotations from "./retailPremiums/RetailApprovedQuotations.jsx";
import RetailAcceptedQuotations from "./retailPremiums/RetailAcceptedQuotations.jsx";
import RetailRejectedQuotations from "./retailPremiums/RetailRejectedQuotations.jsx";
import RetailBlockedQuotations from "./retailPremiums/RetailBlockedQuotations.jsx";
import LowcostPendingQuotations from "./LowCostPremium/LowcostPendingQuotations.jsx";
import LowcostApprovedQuotations from "./LowCostPremium/LowcostApprovedQuotations.jsx";
import LowcostAcceptedQuotations from "./LowCostPremium/LowcostAcceptedQuotations.jsx";
import LowcostRejectedQuotations from "./LowCostPremium/LowcostRejectedQuotations.jsx";
import LowcostBlockedQuotations from "./LowCostPremium/LowcostBlockedQuotations.jsx";
import IshemaPendingQuotations from "./ishema/IshemaPendingQuotations.jsx";
import IshemaApprovedQuotations from "./ishema/IshemaApprovedQuotations.jsx";
import IshemaAcceptedQuotations from "./ishema/IshemaAcceptedQuotations.jsx";
import IshemaRejectedQuotations from "./ishema/IshemaRejectedQuotations.jsx";
import IshemaBlockedQuotations from "./ishema/IshemaBlockedQuotations.jsx";
import SmePendingQuotations from "./sme/SmePendingQuotations.jsx";
import SmeApprovedQuotations from "./sme/SmeApprovedQuotations.jsx";
import SmeAcceptedQuotations from "./sme/SmeAcceptedQuotations.jsx";
import SmeRejectedQuotations from "./sme/SmeRejectedQuotations.jsx";
import SmeBlockedQuotations from "./sme/SmeBlockedQuotations.jsx";
import CorporatePendingQuotations from "./Cooporate/CorporatePendingQuotations.jsx";
import CorporateApprovedQuotations from "./Cooporate/CorporateApprovedQuotations.jsx";
import CorporateAcceptedQuotations from "./Cooporate/CorporateAcceptedQuotations.jsx";
import CorporateRejectedQuotations from "./Cooporate/CorporateRejectedQuotations.jsx";
import CorporateBlockedQuotations from "./Cooporate/CorporateBlockedQuotations.jsx";
import UpdateRetailBeneficiary from "./screens/updateRetail/UpdateRetailInfo.jsx";
import UpdateOutPatientRetal from "./screens/updateRetail/UpdateOutPatient.jsx";
import UpdateDentalPremium from "./screens/updateRetail/UpdateDentalRetail.jsx";
import UpdateOpticalPremium from "./screens/updateRetail/UpdateRetailOptical.jsx";
import UpdateMaternityPremium from "./screens/updateRetail/UpdateRetailMaternity.jsx";
import UpdateRetailBenefits from "./screens/updateRetail/UpdateRetailBenefits.jsx";
import UpdateRetailForm from "./screens/updateRetail/UpdateRetailForm.jsx";
import UpdateCompanyRegistration from "./screens/updateCooporate/updateBeneficiary.jsx";
import UpdateCooporateInpatient from "./screens/updateCooporate/UpdateInpatientPremium.jsx";
import UpdateCooporateOutPatient from "./screens/updateCooporate/UpdateCorporateOutpatient.jsx";
import UpdateDental from "./screens/updateCooporate/UpdateDentalPremium.jsx";
import UpdateCooporateOptical from "./screens/updateCooporate/UpdateCorporateOptical.jsx";
import UpdateCooporateMaternity from "./screens/updateCooporate/UpdateCorporateMaternity.jsx";
import UpdateCorpBenefits from "./screens/updateCooporate/UpdateCorporateBenefits.jsx";
import UpdateCorporateDentalBenefits from "./screens/updateCooporate/UpdateDentalCorporateBenefits.jsx";
import UpdateCorporateOpticalBenefits from "./screens/updateCooporate/UpdateCorporateOpticalBenefits.jsx";
import UpdateSmeBeneficiary from "./screens/updateSme/BeneficiaryRegistration.jsx";
import UpdateSPremiumTable from "./screens/updateSme/PremiumTable.jsx";
import UpdateSOutPatientPremium from "./screens/updateSme/OutPatientPremium.jsx";
import UpdateSDentalPremium from "./screens/updateSme/DentalPremium.jsx";
import UpdateSOpticalPremium from "./screens/updateSme/OpticalPremium.jsx";
import UpdateSMaternityPremium from "./screens/updateSme/MaternityPremium.jsx";
import UpdateSmeBenefits from "./screens/updateSme/Benefits.jsx";
import UpdateSme from "./screens/updateSme/UpdateSme.jsx";
import UpdateLowcostBeneficiary from "./screens/updateLowcost/UpdateBeneficiaryRegistration.jsx";
import UpdateLPremiumTable from "./screens/updateLowcost/UpdateLowcostPremium.jsx";
import UpdateLOutPatientPremium from "./screens/updateLowcost/OutPatientPremium.jsx";
import UpdateLDentalPremium from "./screens/updateLowcost/DentalPremium.jsx";
import UpdateLOpticalPremium from "./screens/updateLowcost/OpticalPremium.jsx";
import UpdateLMaternityPremium from "./screens/updateLowcost/MaternityPremium.jsx";
import UpdateLowcostBenefits from "./screens/updateLowcost/Benefits.jsx";
import UpdateLowCost from "./screens/updateLowcost/UpdateLowcost.jsx";
import UpdateIshemaBeneficiary from "./screens/upadateIshema/BeneficiaryRegistration.jsx";
import UpdateInshemaInpatient from "./screens/upadateIshema/InshemaInpatient.jsx";
import UpdateIshemaOutPatient from "./screens/upadateIshema/IshemaOutPatient.jsx";
import UpdateIshemaBenefits from "./screens/upadateIshema/Benefits.jsx";
import UpdateIshemaForm from "./screens/upadateIshema/UpdateIshema.jsx";
import ExtendedCategoriesForm from "./Cooporate/ExtendedCategoriesForm.jsx";
import AddAgentOrBlocker from "./Cooporate/AddBlockerAndAgent.jsx";
import LastExpenseForm from "./Cooporate/LastExpenseForm.jsx";
import GeneralInclusions from "./Cooporate/GeneralInclusions.jsx";
import AdminCount from "./screens/AdminCount.jsx";
import AdminRole from "./screens/AdminRole.jsx";
import UpdateDentals from "./screens/updateCooporate/UpdateDentals.jsx";
import UpdateOpticals from "./screens/updateCooporate/UpdateOpticals.jsx";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(AuthContext);
  const {userInfo}=state
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-container">
        <ToastContainer position="top-right" limit="1" />

        <header style={{ marginBottom: "2rem" }}>
          <Navbar
            bg="light"
            variant="light"
            expand="lg"
            className="navbar fixed-top"
            style={{
              boxShadow: "-13px 11px 5px 0px rgba(0,0,0,0.75)",
              webkitBoxShadow: "-13px 11px 5px 0px rgba(0,0,0,0.75)",
              mozBoxShadow: "-13px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          >
            <LinkContainer to="/">
              <Navbar.Brand>
                {/* <img
                  width={100}
                  height={130}
                  style={{
                    marginLeft: "2.8rem",
                    marginTop: "-55px",
                    marginBottom: "-200px",
                  }}
                  src={logo}
                  alt="logo"
                />*/}
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              style={{ marginRight: "100px" }}
            >
              {state.userInfo && (
                <Nav className="me-auto w-100 justify-content-end">
                  {userInfo.role!=="admin"&&(
<>
                  <NavDropdown title="Closed">
                    <LinkContainer to="/closedretail">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/closedCorporate">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/closedLowcost">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/closedIshema">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/closedSme">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Approved">
                    <LinkContainer to="/approvedretail">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/approvedCorporate">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/approvedLowcost">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/approvedIshema">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/approvedSme">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Pendings">
                    <LinkContainer to="/Pendingretail">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/PendingCorporate">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/PendingLowcost">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pendingIshema">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pendingSme">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Rejected">
                    <LinkContainer to="/rejectedretail">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/rejectedCorporate">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/rejectedLowcost">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/rejectedIshema">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/rejectedSme">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Blocked">
                    <LinkContainer to="/blockedretail">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blockedCorporate">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blockedLowcost">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blockedIshema">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blockedSme">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown title="New Products">
                    <LinkContainer to="/retailBeneficiary">
                      <Nav.Link>Retail</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/company">
                      <Nav.Link>Corporate</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/lowcostClient">
                      <Nav.Link>Low Cost</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/ishemaClient">
                      <Nav.Link>Ishema</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/smeClient">
                      <Nav.Link>SME</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
</>
                  )}

                  <NavDropdown
                    title={state.userInfo.name}
                    id="basic-nav-dropdown"
                  >
                    {/* <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer> */}
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Logout
                    </Link>
                  </NavDropdown>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main className="main-content" style={{ margin: "2rem" }}>
          <Container>
            <Routes>
              <Route exact path="/" element={<LoginForm />} />
              <Route exact path="/retail" element={<RetailForm />} />
              <Route exact path="/retail/:id" element={<RetailDetails />} />
              <Route
                exact
                path="/retailInfo/:id"
                element={<UpdateRetailBeneficiary />}
              />
              <Route exact path="/retailOption" element={<PremiumTable />} />
              <Route exact path="/retailDental" element={<DentalPremium />} />
              <Route exact path="/retailOptical" element={<OpticalPremium />} />
              <Route exact path="/retailList" element={<RetailList />} />
              <Route exact path="/retailOut" element={<OutPatientPremium />} />
              <Route exact path="/updateretailIn/:id" element={<UpdateRetailInpatient/>} />
              <Route exact path="/updateOut/:id" element={<UpdateOutPatientRetal/>} />
              <Route exact path="/updateretailDental/:id" element={<UpdateDentalPremium/>} />
              <Route exact path="/updateRetailOptical/:id" element={<UpdateOpticalPremium/>} />
              <Route exact path="/updateRetailMaternity/:id" element={<UpdateMaternityPremium/>} />
              <Route exact path="/UpdateRetailBenefits/:id" element={<UpdateRetailBenefits/>} />
              <Route exact path="/UpdateRetail/:id" element={<UpdateRetailForm/>} />
              <Route
                exact
                path="/pendingRetail"
                element={<PendingRetailQuotations />}
              />
              <Route
                exact
                path="/approvedretail"
                element={<RetailApprovedQuotations />}
              />
              <Route
                exact
                path="/closedretail"
                element={<RetailAcceptedQuotations />}
              />
              <Route
                exact
                path="/rejectedretail"
                element={<RetailRejectedQuotations />}
              />
              <Route
                exact
                path="/blockedretail"
                element={<RetailBlockedQuotations />}
              />
              <Route
                exact
                path="/retailBenefits"
                element={<RetailBenefits />}
              />
              <Route
                exact
                path="/retailBeneficiary"
                element={<RetailBeneficiary />}
              />
              <Route
                exact
                path="/brockers"
                element={<AddAgentOrBlocker />}
              />
              
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/new/:id" element={<AddCustomer />} />
              <Route
                path="/customers/details/:id"
                element={<CustomerDetail />}
              />
              <Route
                path="/add/cooporateCustomers/:id"
                element={<CooporateCustomerDetails />}
              />
              <Route
                path="/cooporateCustomer/:id"
                element={<CooporateCustomer />}
              />
              <Route
                path="/reviseInfo/:id"
                element={<UpdateCompanyRegistration/>}
              />
              <Route
                path="/updateIncooporate/:id"
                element={<UpdateCooporateInpatient/>}
              />
              <Route
                path="/updateOutcooporate/:id"
                element={<UpdateCooporateOutPatient/>}
              />
              <Route
                path="/updateDental/:id"
                element={<UpdateDentals/>}
              />
              <Route
                path="/UpdateCooporateOptical/:id"
                element={<UpdateOpticals/>}
              />
              <Route
                path="/UpdateCooporateMaternity/:id"
                element={<UpdateCooporateMaternity/>}
              />
              <Route
                path="/UpdateCorpOpticalBenefits/:id"
                element={<UpdateCorporateOpticalBenefits/>}
              />
              <Route
                path="/UpdateCorpDentalBenefits/:id"
                element={<UpdateCorporateDentalBenefits/>}
              />
              <Route
                path="/UpdateCorpBenefits/:id"
                element={<UpdateCorpBenefits/>}
              />

              <Route
                exact
                path="/retailMaternity"
                element={<MaternityPremium />}
              />
              <Route exact path="/lowcostOption" element={<LPremiumTable />} />
              <Route exact path="/lowcostDental" element={<LDentalPremium />} />
              <Route
                exact
                path="/lowcostOptical"
                element={<LOpticalPremium />}
              />
              <Route exact path="/lowcostList" element={<LowcostList />} />
              <Route
                exact
                path="/lowcostClient"
                element={<LowcostBeneficiary />}
              />
              <Route exact path="/lowcostInfo/:id" element={<UpdateLowcostBeneficiary/>} />
              <Route exact path="/updateLowcostIn/:id" element={<UpdateLPremiumTable/>} />
              <Route exact path="/updatelowcostOut/:id" element={<UpdateLOutPatientPremium/>} />
              <Route exact path="/lowcostDental/:id" element={<UpdateLDentalPremium/>} />
              <Route exact path="/lowcostOptical/:id" element={<UpdateLOpticalPremium/>} />
              <Route exact path="/lowcostMaternity/:id" element={<UpdateLMaternityPremium/>} />
              <Route exact path="/lowcostBenefits/:id" element={<UpdateLowcostBenefits/>} />
              <Route exact path="/updateLowcost/:id" element={<UpdateLowCost/>} />

              <Route
                exact
                path="/lowcostBenefits"
                element={<LowcostBenefits />}
              />
              <Route
                exact
                path="/lowcostOut"
                element={<LOutPatientPremium />}
              />
              <Route exact path="/lowcost/:id" element={<LowCostDetails />} />
             
              <Route
                exact
                path="/lowcostMaternity"
                element={<LMaternityPremium />}
              />
              <Route
                exact
                path="/pendingLowcost"
                element={<LowcostPendingQuotations />}
              />
              <Route
                exact
                path="/approvedLowcost"
                element={<LowcostApprovedQuotations />}
              />
              <Route
                exact
                path="/closedLowcost"
                element={<LowcostAcceptedQuotations />}
              />
              <Route
                exact
                path="/rejectedLowcost"
                element={<LowcostRejectedQuotations />}
              />
              <Route
                exact
                path="/blockedLowcost"
                element={<LowcostBlockedQuotations />}
              />

              <Route exact path="/sme" element={<SME />} />
              <Route exact path="/sme/:id" element={<SmeDetails />} />
              <Route exact path="/smeOption" element={<SPremiumTable />} />
              <Route exact path="/smeClient" element={<SmeBeneficiary />} />
              <Route exact path="/smeDental" element={<SDentalPremium />} />
              <Route exact path="/smeOptical" element={<SOpticalPremium />} />
              <Route exact path="/smeOut" element={<SOutPatientPremium />} />
              <Route exact path="/smeInfo/:id" element={<UpdateSmeBeneficiary/>} />
              <Route exact path="/updatesmeIn/:id" element={<UpdateSPremiumTable/>} />
              <Route exact path="/smeOut/:id" element={<UpdateSOutPatientPremium/>} />
              <Route exact path="/smeDental/:id" element={<UpdateSDentalPremium/>} />
              <Route exact path="/smeOptical/:id" element={<UpdateSOpticalPremium/>} />
              <Route exact path="/smeMaternity/:id" element={<UpdateSMaternityPremium/>} />
              <Route exact path="/smeBenefits/:id" element={<UpdateSmeBenefits/>} />
              <Route exact path="/updateSme/:id" element={<UpdateSme/>} />
              {/* 
              
              
              
              
              
               */}
              <Route
                exact
                path="/smeMaternity"
                element={<SMaternityPremium />}
              />
              <Route exact path="/smeBenefits" element={<SmeBenefits />} />
              <Route exact path="/smeList" element={<SmeList />} />
              <Route
                exact
                path="/pendingSme"
                element={<SmePendingQuotations />}
              />
              <Route
                exact
                path="/approvedSme"
                element={<SmeApprovedQuotations />}
              />
              <Route
                exact
                path="/closedSme"
                element={<SmeAcceptedQuotations />}
              />
              <Route
                exact
                path="/rejectedSme"
                element={<SmeRejectedQuotations />}
              />
              <Route
                exact
                path="/blockedSme"
                element={<SmeBlockedQuotations />}
              />

              <Route exact path="/lowcost" element={<LowCostForm />} />
              <Route exact path="/register" element={<RegisterForm />} />
              <Route exact path="/ishema" element={<IshemaForm />} />
              <Route
                exact
                path="/ishemaClient"
                element={<IshemaBeneficiary />}
              />
              <Route
                exact
                path="/ishemaBenefits"
                element={<IshemaBenefits />}
              />
              <Route exact path="/ishemaInfo/:id" element={<UpdateIshemaBeneficiary/>} />
              <Route exact path="/ishemaIn/:id" element={<UpdateInshemaInpatient/>} />
              <Route exact path="/ishemaOut/:id" element={<UpdateIshemaOutPatient/>} />
              <Route exact path="/ishemaBenefits/:id" element={<UpdateIshemaBenefits/>} />
              <Route exact path="/updateIshema/:id" element={<UpdateIshemaForm/>} />    
              <Route exact path="/ishemaList" element={<IshemaList />} />
              <Route exact path="/ishema/:id" element={<IshemaDetails />} />
              <Route
                exact
                path="/updateishema/:id"
                element={<UpdateIshema />}
              />
              <Route
                exact
                path="/pendingIshema"
                element={<IshemaPendingQuotations />}
              />
              <Route
                exact
                path="/approvedIshema"
                element={<IshemaApprovedQuotations />}
              />
              <Route
                exact
                path="/closedIshema"
                element={<IshemaAcceptedQuotations />}
              />
              <Route
                exact
                path="/rejectedIshema"
                element={<IshemaRejectedQuotations />}
              />
              <Route
                exact
                path="/blockedIshema"
                element={<IshemaBlockedQuotations />}
              />

              <Route exact path="/ishemaIn" element={<InshemaInpatient />} />
              <Route exact path="/ishemaout" element={<IshemaOutPatient />} />
              <Route exact path="/cooporate" element={<Cooporate />} />
              <Route exact path="/mixed/:id" element={<Mixed />} />

              <Route exact path="/members/:id" element={<MembersList />} />
              <Route exact path="/cooporateList" element={<CooperateList />} />
              <Route
                exact
                path="/incooporate"
                element={<CooporateInpatient />}
              />
              <Route exact path="/cooporate/:id" element={<Combined />} />

              <Route
                exact
                path="/updatecooporate/:id"
                element={<UpdateCooperateForm />}
              />
              <Route
                exact
                path="/exclusions"
                element={<GeneralInclusions />}
              />
              <Route exact path="/denta" element={<Dentals />} />
              {userInfo&&(userInfo.role===("assistant_underwriter"||"underwriter")?(

<Route exact path="/welcome" element={<Count />} />
):(userInfo.role==="admin")?(
  <Route exact path="/welcome" element={<AdminRole />} />
):(
<Route exact path="/welcome" element={<AdminCount/>} />
))}
              <Route exact path="/corpBenefits" element={<CorpBenefits />} />
              <Route
                exact
                path="/corpDentalBenefits"
                element={<CorporateDentalBenefits />}
              />
              <Route
                exact
                path="/corpOpticalBenefits"
                element={<CorporateOpticalBenefits />}
              />
              <Route
                exact
                path="/extended"
                element={<ExtendedCategoriesForm />}
              />
              <Route exact path="/company" element={<CompanyRegistration />} />
              <Route
                exact
                path="/outcooporate"
                element={<CooporateOutPatient />}
              />
              <Route exact path="/cooporateOptical" element={<Opticals />} />
              <Route
                exact
                path="/cooporateMaternity"
                element={<CooporateMaternity />}
              />
              <Route
                exact
                path="/pendingCorporate"
                element={<CorporatePendingQuotations />}
              />
              <Route
                exact
                path="/lastExpense"
                element={<LastExpenseForm />}
              />
              <Route
                exact
                path="/approvedCorporate"
                element={<CorporateApprovedQuotations />}
              />
              <Route
                exact
                path="/closedCorporate"
                element={<CorporateAcceptedQuotations />}
              />
              <Route
                exact
                path="/rejectedCorporate"
                element={<CorporateRejectedQuotations />}
              />
              <Route
                exact
                path="/blockedCorporate"
                element={<CorporateBlockedQuotations />}
              />
              <Route
                exact
                path="/quotation-result/:id"
                element={<QuotationResult />}
              />
            </Routes>
          </Container>
        </main>
        {/* <footer className="footer">
          <img
            width={200}
            height={600}
            style={{
              marginTop: "-70px",
              marginBottom: "-50px",
            }}
            src={footerImage}
            alt="footer"
          />
          <div className="text-center">All rights reserved</div>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
