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
          [%ownedsafes (om (om (ar so)))]
          [%fe-test ul]
      ==
    ++  parse-added-safes
      %-  ot
      :~  [%threshold ni]
          [%'ethBalance' so]
          [%owners (ar (ot ~[[%value so]]))]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
