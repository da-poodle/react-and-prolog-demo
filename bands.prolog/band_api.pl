:- module(band_api, []).

:- use_module(library(http/http_dispatch)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).
:- use_module(library(pcre)).

% The web api handlers
:- http_handler(root('api/bands'), band_list, []).
:- http_handler(root('api/albums'), band_albums, []).

% json converters for the band and album so we can send/receive them on
% the internetz.
:- json_object band(name:atom, year:integer, country:atom).
:- json_object album(band:atom, name:atom, year:integer).

% need our bands!
:- ensure_loaded(bands).

% api to get a list of bands, this allows for an optional match
% parameter although it isn't used in the demo.
%
% Will reply with a list of bands based with the name matching the match
% paramter.
band_list(Request) :-
	http_parameters(Request,
			[match(Match, [optional(true), default('.*')])]),

	findall(
	    band(Name, Year, Country),
	    (
		band(Name, Year, Country),
		re_match(Match/i, Name)
	    ),
	    Bands),

	prolog_to_json(Bands, S),
	reply_json(S, []).


% api to get the list of albums for a band, this requires a paramter of
% band which is sent by the react front end.
%
% Will reply with a list of albumns for a band with a name exactly
% matching the band parameter.
band_albums(Request) :-
	http_parameters(Request,
			[band(Band, [])]),

	findall(album(Band, Album, Year),
		band_album(Band, Album, Year),
		Albums),

	prolog_to_json(Albums, S),
	reply_json(S, []).





