import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import { useTheme } from "./ThemeContext.jsx";
import CurtainReveal from "./components/curtainReveal/CurtainReveal";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import AccountVerification from "./pages/accountverification/Account-Verification.jsx";
import ForgetPassword from "./pages/forgotpassword/forgot-password.jsx";
import VerifyOTP from "./pages/verifyotp/verify-otp.jsx";
import ResetPassword from "./pages/resetpassword/reset-password.jsx";
import Layout from "./components/layout/Layout.jsx";
import LandingPage from "./pages/landingpage/Landing-Page.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import ProjectCenter from "./pages/projectcenter/Project-Center.jsx";
import ProjectDashboard from "./pages/projectdashboard/Project-Dashboard.jsx";
import KnowledgeCenter from "./pages/knowledgecenter/Knowledge-Center.jsx";
import VideoCenter from "./pages/videocenter/Video-Center.jsx";
import VideoDetails from "./pages/videodetails/Video-Details.jsx";
import DocumentCenter from "./pages/documentcenter/Document-Center.jsx";
import FolderView from "./pages/folderview/Folder-View.jsx";
import DocumentDetails from "./pages/documentdetails/Document-Details.jsx";
import ArticleCenter from "./pages/articlecenter/Article-Center.jsx";
import ArticleDetails from "./pages/articledetails/Article-Details.jsx";
import RiskCenter from "./pages/riskcenter/Risk-Center.jsx";
import IssueCenter from "./pages/issuecenter/Issue-Center.jsx";
import ActionCenter from "./pages/actioncenter/Action-Center.jsx";
import StakeHolderCenter from "./pages/stakeholdercenter/StakeHolder-Center.jsx";
import LessonLearnedCenter from "./pages/lessonlearnedcenter/LessonLearned-Center.jsx";
import EPMOCenter from "./pages/epmocenter/EPMO-Center.jsx";
import ScheduleCenter from "./pages/schedulecenter/Schedule-Center.jsx";
import BOQCenter from "./pages/boqcenter/BOQ-Center.jsx";
import DeliverablesCenter from "./pages/deliverablecenter/Deliverable-Center.jsx";
import BuildTeamCenter from "./pages/buildteamcenter/Build-Team-Center.jsx";
import WorkflowCenter from "./pages/workflowcenter/Workflow-Center.jsx";
import POCenter from "./pages/pocenter/PO-Center.jsx";
import DocumentPanel from "./pages/documentpanel/Document-Panel.jsx";
import ProjectCharter from "./pages/projectcharter/Project-Charter.jsx";
import ProjectPlan from "./pages/projectplan/Project-Plan.jsx";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme}-theme`}>
      <Router>
        <Routes>
          {/* Auth route   */}
          <Route path="/" element={ <CurtainReveal>  {" "}  <Login />{" "}</CurtainReveal>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Account-Verification" element={<AccountVerification />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* All other routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/Landing-Page" element={<LandingPage />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Project-Center" element={<ProjectCenter />} />
            <Route path="/Project-Dashboard" element={<ProjectDashboard />} />
            {/* Multimedia-Centers  */}
            <Route path="/Knowledge-Center" element={<KnowledgeCenter />} />
            <Route path="/Video-Center" element={<VideoCenter />} />
            <Route path="/video-details" element={<VideoDetails />} />
            <Route path="/Document-Center" element={<DocumentCenter />} />
            <Route path="/folder-view" element={<FolderView />} />
            <Route path="/document-details" element={<DocumentDetails />} />
            <Route path="/Article-Center" element={<ArticleCenter />} />
            <Route path="/article-details" element={<ArticleDetails />} />
            {/* Data-Center  */}
            <Route path="/Risk-Center" element={<RiskCenter />} />
            <Route path="/Issue-Center" element={<IssueCenter />} />
            <Route path="/Action-Center" element={<ActionCenter />} />
            <Route path="/StakeHolder-Center" element={<StakeHolderCenter />} />
            <Route path="/LessonLearned-Center" element={<LessonLearnedCenter />}/>
            <Route path="/EPMO-Center" element={<EPMOCenter />} />
            <Route path="/Schedule-Center" element={<ScheduleCenter />} />
            <Route path="/BOQ-Center" element={<BOQCenter />} />
            <Route path="/Deliverable-Center" element={<DeliverablesCenter />}/>
            <Route path="/Build-Team-Center" element={<BuildTeamCenter />} />
            <Route path="/Workflow-Center" element={<WorkflowCenter />} />
            <Route path="/PO-Center" element={<POCenter />} />
            {/* Document-Panel */}
            <Route path="/Document-Panel" element={<DocumentPanel />} />
            {/* Project-Section */}
            <Route path="/Project-Charter" element={<ProjectCharter/>}/>
            <Route path="/Project-Plan" element={<ProjectPlan/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
