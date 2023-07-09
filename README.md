# Transport Triggered Architecture - Modular (Take 2)

[**Build Log**](https://github.com/dslik/ttam/blob/master/build_log_2.md)

This project went dorment due to COVID and work issues, but I'm now in a position to start working on it again. Instead of directly building 3U Eurocard modules, I'm instead starting from smaller modules representing the main parts of the computer:

* ALU Module - Provides basic ALU functionality
* Program Memory Module - Provides program storage
* Program Counter Module - Basic program counter + R/W access
* Register File Module - Provides general purpose registers and ROM data
* Clock Module - Provides multi-phase clocks
* Initial Program Load Module - Provides initial bootstrapping, copying the monitor from ROM into program RAM
* Address Decoder Module - Activates read and write sockets
* Input Module - Dip Switches for data entry
* Output Module - Binary LED display for data readout

All of these stamps follow the [Protonema stamp format](https://github.com/dslik/protonema/tree/main/stamps#templates).

# Transport Triggered Architecture - Modular (Take 1)

This was the original (incomplete) design documentation for the TTAM implementation. This document will be updated over time to reflect the new approach being taken.

[**Build Log**](https://github.com/dslik/ttam/blob/master/build_log.md)

[**Design and Implementation Guide**](https://dslik.github.io/ttam/)

## Acknowledgements

* Documentation template contributed to the public domain by the Secure Scuttlebutt project: https://github.com/ssbc/scuttlebutt-protocol-guide
* Timing diagrams by https://github.com/wavedrom/wavedrom
