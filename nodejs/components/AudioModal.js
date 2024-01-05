import React, { useState, useMemo } from "react";
import { useRef } from "react";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
var _ = require("underscore");
_.mixin(require('../mixins'))

const AudioModal = observer(function AudioModal({ }) {

  const store = useStore();
  const { sentences } = store;
 

  return (
    <>
    </>
  );
})

export default AudioModal;
