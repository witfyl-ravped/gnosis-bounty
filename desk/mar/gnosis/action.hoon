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
      :~
        [%addressbook parse-address-book]
        [%addedsafes parse-added-safes]
        [%fe-test ul]
        [%add-address so]
        [%add-safe parse-safe]
      ==
    ++  parse-address-book
      ^-  $-(json (map))  ::  $-(json (map term (map term cord)))
      (om (om so))
    ++  parse-added-safes
      ^-  $-(json (map))
      (om (om (ot ~[[%threshold ni] [%ethbalance so] [%owners (ar (ot ~[[%value so]]))]])))
    ++  parse-safe
      %-  ot
      :~  [%value so]
          [%name so]
          [%owners (ar parse-names)]
      ==
    ++  parse-names
      %-  ot
      :~  [%value so]
          [%name so]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
