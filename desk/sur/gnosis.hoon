|%
+$  chain-id  @t
::
+$  address  @t
::
+$  name  @t
::
+$  safe-contents  [threshold=@ud ethbalance=@t owners=(list address=@t)]
::
+$  safes  (map chain-id (map address=@t safe-contents))
::
+$  address-book  (map chain-id (map address name))
::
+$  owned-safes  (map address (map chain-id (list address)))
::
+$  cookies  [updates=? necessary=? analytics=?]
::
+$  session  [@t (map chain-id address)]
::
+$  preloaded-state  [safes address-book session]
::
+$  safe
  $:  address=@t
      name=@t
      owners=(list [address=@t name=@t])
  ==
::
+$  action
    $%  [%addedsafes safes]
        [%addressbook address-book]
        [%cookies cookies]
        [%ownedsafes owned-safes]
        [%session session]
        [%fe-test ~]
    ==
::
+$  update
    $%  [%preloaded-state =preloaded-state]
        [%address-book =address-book]
        [%added-safes =safes]
        [%cookies =cookies]
        [%owned-safes =owned-safes]
        [%session =session]
        [%test-num num=@ud]
    ==
--