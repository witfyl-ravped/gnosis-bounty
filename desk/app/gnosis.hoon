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
    :_  state
    ~[[%give %fact ~[/updates] %gnosis-update !>([%test-num 42.069])]]
    ::
        %addressbook
      =.  address-book.state  +.act
      `state
    ::
        %addedsafes
      =.  safes.state  +.act
      `state
    ::
        %cookies
      =.  cookies.state  +.act
      `state
    ::
        %ownedsafes
      `state
    ::
        %session
      =.  session.state  +.act
      `state
        %settings
      =.  settings.state  +.act
      `state
    ==
  --
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  !!
      [%updates ~]
    :_  this
    [%give %fact ~[/updates] gnosis-state-0+!>(state)]~
  ==
++  on-leave  on-leave:def
++  on-peek  on-peek:def
++  on-agent  on-agent:def
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--
