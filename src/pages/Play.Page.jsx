import React from "react";

// HOC
import DefaultlayoutHoc from "../layout/Default.layout";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const PlayPage = () => {
  return <div>PlayPage</div>;
};

export default DefaultlayoutHoc(PlayPage);
