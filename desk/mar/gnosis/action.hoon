/-  *gnosis
|_  act=action
++  grab
  |%
  ++  noun  action
  ++  json
    =,  dejs:format
    |=  jon=json
    %-  action
    =<  (fe-action jon)
    |%
    ++  fe-action
      %-  of
      :~  [%addedsafes (om (om parse-added-safes))]
          [%addressbook (om (om so))]
          [%cookies parse-cookies]
          [%ownedsafes (om (om (ar so)))]
          [%session parse-session]
          [%fe-test ul]
      ==
    ++  parse-cookies
      %-  ot
      :~  [%updates bo]
          [%necessary bo]
          [%analytics bo]
      ==
    ++  parse-added-safes
      %-  ot
      :~  [%threshold ni]
          [%'ethBalance' so]
          [%owners (ar (ot ~[[%value so]]))]
      ==
    ++  parse-session
      %-  ot
      :~  [%'lastChainId' so]
          [%'lastSafeAddress' (om so)]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
