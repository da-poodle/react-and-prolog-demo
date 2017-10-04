:- module(react_router, [route/1]).

:- use_module(library(regex)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).

% The default hanlder for static files, there may be more
% handlers in other modules/files.
:- http_handler(root(.), http_reply_from_files('htdocs', []), [prefix]).

route(Request) :-
      memberchk(path(Path), Request),
      format(user_output, "path is ~p~n", [Path]), % for debugging only
      do_route(Request, Path).

% if use_default_router is good then just dispatch
do_route(Request, Path) :-
      use_default_router(Path),
      http_dispatch(Request),
      !. % cut here as we have found our target.

% we can't find any relevant route so send back the index page and let
% react sort it out.
do_route(Request, _) :-
      http_reply_file('htdocs/index.html', [], Request).

% these regex's define how we load. Basically if we request anything in
% the api or static folders or the favicon then use a http_dispatch
% router. If anything else then send back the index page and let react
% handle it.
use_default_router(P) :- P =~ '^/api/'.
use_default_router(P) :- P =~ '^/static/'.
use_default_router(P) :- P =~ '^/favicon.ico$'.



