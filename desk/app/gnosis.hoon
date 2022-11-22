/-  *gnosis
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0
  $:  =safes
      =address-book
      =cookies
      =session
      =settings
  ==
::
+$  card  card:agent:gall
::
--
=|  state-0
=*  state  -
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def  ~(. (default-agent this %.n) bowl)
::
++  on-init
  `this(state *state-0)
++  on-save  !>(state)
++  on-load
  |=  =old=vase
  ^-  (quip card _this)
  ~&  >  "reloaded"
  `this(state !<(state-0 old-vase))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  =^  cards  state
  ?+    mark  !!
      %gnosis-action
    (handle-frontend-poke !<(action vase))
  ==
  [cards this]
  ::
  ++  handle-frontend-poke
    |=  act=action
    ^-  (quip card _state)
    ?-    -.act
        %fe-test
      :: ~&  >>  "received test poke from {<src.bowl>}"
    :_  state
    ~[[%give %fact ~[/updates] %gnosis-update !>([%test-num 42.069])]]
    ::
        %addressbook
      :: ~&  >>  "addy {<act>}"
      =.  address-book.state  +.act
      `state
    ::
        %addedsafes
      :: ~&  >>  "added safes: {<+.act>}"
      =.  safes.state  +.act
      `state
    ::
        %cookies
      ::  ~&  >  [%cookies-yum +.act]
      =.  cookies.state  +.act
      `state
    ::
        %ownedsafes
      :: =.  owned-safes.state  +.act
      `state
    ::
        %session
      :: ~&  >  "got some session info: {<act>}"
      =.  session.state  +.act
      `state
        %settings
      :: ~&  >  [%settings-nice +.act]
      =.  settings.state  +.act
      `state
      ::   %add-address
      :: ?:  (~(has by addresses.state) new-address.act)
      ::   ~&   >>>  "{<new-address.act>} already exists"
      ::   `state      
      :: =.  addresses.state
      :: =/  num  (lent ~(tap in ~(key by addresses.state)))
      :: (~(put by addresses.state) new-address.act num)
      :: `state
    ::
      ::   %add-safe
      :: ~&  >  "found safe: {<name.act>} at: {<address.act>}"
      :: ::
      :: ?:  (~(has by safes.state) address.act) 
      ::   ~&  >>>  "{<name.act>} already exists at: {<address.act>}"
      ::   `state
      :: =.  safes.state
      :: (~(put by safes.state) address.act +.act)
      :: `state
    ==
  --
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  !!
      [%updates ~]
    :: ~&  >  "{<src.bowl>} in the house"
    :_  this
    [%give %fact ~[/updates] gnosis-state-0+!>(state)]~
        :: [%give %fact ~[/updates] %gnosis-update !>([%address-book address-book.state])]
        :: [%give %fact ~[/updates] %gnosis-update !>([%added-safes safes.state])]
        :: [%give %fact ~[/updates] %gnosis-update !>([%owned-safes owned-safes.state])]
        :: [%give %fact ~[/updates] %gnosis-update !>([%session session.state])]
  ==
++  on-leave  on-leave:def
++  on-peek  on-peek:def
++  on-agent  on-agent:def
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--
