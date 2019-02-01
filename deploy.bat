@echo off

IF "%1"=="" (
    SET USUARIO=main
) ELSE (
    SET USUARIO=%1
)

gulp --usuario %USUARIO%
