Build Log
=========

2020-06-21

Having a bus monitor is important for debugging and single-step programming. I'd like to have the bus monitor serve two purposes: To show the status of the bus, and to show the value of two registers. This way the same card can be used as a simple output device. As such, the bus monitor card needs to support two optional GRAMs+GRDMs.

Switching between the live address and data busses requires a switch, ideally something like a '257, but unfortunately, the only ones I have on-hand are HC, and thus won't work with the TTL voltages that I'm using.

Displaying the bus values could be done using LED bar graphs, 16 LEDs for each bit of the address bus and 16 LEDs for each bit for the data bus. However, I'd like to show them as hex values, since that simplifies programming. While this can be accomplished using a 7-segment display and some logic, I'm going to use a small EPROM as a look-up table and some LED matrix displays instead. This way I can show either binary or hex. These are now ordered, along with some right-angle DIP sockets (which are surprisingly hard to find and expensive).

Since the bus monitor board is based on the TTAM Carrier, I've been working on that board first. It's a little tricky to route with only two layers, but I'll be able to make it work.

2020-06-13

The first functional unit, a single register, is done. The delay logic to handle asynchronous operation takes more board space than I would have liked. The delay IC I chose is one I have on hand, selecting a different one that has a different configuration of delays may allow me to reduce the number of delay ICs from two to one, which would save some space. I could also move this onto the carrier, but that only makes sense if the delay can be made configurable. 

Using a different register IC would also allow me to reduce the number of ICs, but then I can’t use boundary scan to test things, which is an area of system design that I would like to explore in this project.

Perhaps I need to abandon having boundary scan on each register functional unit, and instead build a boundary scan module? This also would deal with the problem of not being able to drive control lines in the current design.

2020-06-07

The address board is done, this decodes the address bus and handles the control signals to indicate when a functional unit should read from the bus or write to the bus. Language here is a little confusing, since reading the contents of a register is a write to the bus, and writing to a register is a read from the bus, so signal names are “wrong” depending on from what perspective you’re looking at.

Not 100% happy with so many pins being required for the address module. I would have preferred to stick with 24 pins, not 32.

2020-06-06

Start of project. Figured out basic bus structure and control lines. Goal is to support both a synchronous clock and fully asynchronous operation, with each functional unit signalling when it is finished processing. Asynchronous operation requires additional logic to handle delays in each functional unit, however. We'll see how much of a problem this will be.

Goal is to have modular "plug-ins" that attach to a carrier board. That way I can have one standard VME-style board and pick and choose which functional units are installed. Ideally, the carrier board would be completely passive, but in order to avoid long traces tee'd off of the backplane, I'll likely need a bus transceiver to drive the board (and the bus).